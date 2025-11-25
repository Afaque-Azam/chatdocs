import { NextResponse } from "next/server";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { InferenceClient } from "@huggingface/inference";
import { connectdb } from "@/db/connectdb";
import { currentUser } from '@clerk/nextjs/server';
import { Mongconnectdb } from "@/mongodb/dbconnect";
import { UserData } from "@/Model/userdata";

export const POST = async (req) => {
    try {
        console.log("🚀 === UPLOAD STARTED ===");
        
        const User = await currentUser();
        console.log("👤 User ID:", User?.id);
        
        if (!User) {
            return NextResponse.json({
                success: false,
                message: "Please LogIn to use this Service"
            }, { status: 401 });
        }

        const body = await req.json();
        const { filetext, filename, totalpages } = body;
        console.log("📄 Filename:", filename);
        console.log("📄 Total pages:", totalpages);
        console.log("📄 Text length:", filetext?.length || 0);

        // Validate inputs
        if (!filetext || !filename || !totalpages) {
            console.error("❌ Missing required fields");
            return NextResponse.json({
                success: false,
                message: "Missing required fields: filetext, filename, or totalpages"
            }, { status: 400 });
        }

        // Connect to Astra DB
        console.log("🔌 Connecting to Astra DB...");
        const dbcollection = await connectdb();
        console.log("✅ Astra DB connected");
        
        // Connect to MongoDB
        console.log("🔌 Connecting to MongoDB...");
        await Mongconnectdb();
        console.log("✅ MongoDB connected");

        // Calculate chunk size
        const cc = Math.floor(totalpages / 10);
        const chunksize = cc === 0 ? 1000 : cc * 1000;
        console.log("📊 Chunk size:", chunksize);

        // Split text
        const splitter = new RecursiveCharacterTextSplitter({
            chunkSize: chunksize,
            separators: ['\n\n', '\n', '  ', '  '],
            chunkOverlap: 100
        });

        const chunks = await splitter.splitText(filetext);
        console.log(`✂️ Split into ${chunks.length} chunks`);

        // Create user data record in MongoDB
        console.log("💾 Creating MongoDB record...");
        try {
            await UserData.create({
                userid: User.id,
                chatname: filename
            });
            console.log("✅ MongoDB record created");
        } catch (mongoError) {
            if (mongoError.code === 11000) {
                console.log("⚠️ Chat already exists, continuing...");
            } else {
                console.error("❌ MongoDB error:", mongoError.message);
                throw mongoError;
            }
        }

        // Check Hugging Face API token
        const apiToken = process.env.NEXT_PUBLIC_API_VECTOR_EMBEDING_API;
        if (!apiToken) {
            console.error("❌ Missing Hugging Face API token");
            return NextResponse.json({
                success: false,
                message: "Missing Hugging Face API token in environment variables"
            }, { status: 500 });
        }

        console.log("🧩 Processing chunks with embeddings...");
        const client = new InferenceClient(apiToken);
        let successfulChunks = 0;

        for (let i = 0; i < chunks.length; i++) {
            console.log(`📤 Processing chunk ${i + 1}/${chunks.length}`);
            
            try {
                const chunkdata = chunks[i];
                
                // Generate embedding
                console.log(`🔄 Generating embedding for chunk ${i + 1}...`);
                const output = await client.featureExtraction({
                    model: "intfloat/multilingual-e5-large",
                    inputs: chunkdata,
                });
                console.log(`✅ Embedding generated`);

                // Insert into Astra DB
                console.log(`💾 Inserting chunk ${i + 1} into Astra DB...`);
                const res = await dbcollection.insertOne({
                    $vector: output,
                    description: chunkdata,
                    userid: User.id,
                    chat_name: filename
                });
                console.log(`✅ Chunk ${i + 1} inserted successfully`);
                
                successfulChunks++;
            } catch (chunkError) {
                console.error(`❌ Error processing chunk ${i + 1}:`, chunkError.message);
                console.error("Full error:", chunkError);
                
                // Check for rate limit errors
                if (chunkError.message?.includes("429") || 
                    chunkError.message?.toLowerCase().includes("rate limit")) {
                    throw new Error(`Hugging Face rate limit exceeded at chunk ${i + 1}. Please wait a few minutes and try again.`);
                }
                
                // For other errors, continue but log
                console.error(`⚠️ Skipping chunk ${i + 1}, continuing...`);
            }
        }

        console.log(`🎉 Upload completed: ${successfulChunks}/${chunks.length} chunks processed`);

        if (successfulChunks === 0) {
            return NextResponse.json({
                success: false,
                message: "Failed to process any chunks. Check server logs for details."
            }, { status: 500 });
        }

        return NextResponse.json({
            success: true,
            message: "File uploaded successfully",
            chunksProcessed: successfulChunks,
            totalChunks: chunks.length
        });

    } catch (error) {
        // THIS IS THE KEY PART - Log and return the ACTUAL error
        console.error("❌ ========= CRITICAL ERROR =========");
        console.error("❌ Error name:", error.name);
        console.error("❌ Error message:", error.message);
        console.error("❌ Error stack:", error.stack);
        console.error("❌ Full error object:", JSON.stringify(error, Object.getOwnPropertyNames(error), 2));
        console.error("❌ ===================================");
        
        return NextResponse.json({
            success: false,
            message: error.message || "Unknown error occurred",
            errorType: error.name || "Error",
            // Only show details in development
            ...(process.env.NODE_ENV === 'development' && { 
                errorDetails: error.toString(),
                stack: error.stack 
            })
        }, { status: 500 });
    }
};

import { NextResponse } from "next/server";
import { connectdb } from "@/db/connectdb";
import { currentUser } from '@clerk/nextjs/server';

export const POST = async (req) => {
    try {
        console.log("🚀 CHAT AI REQUEST STARTED");
        
        const User = await currentUser();
        if (!User) {
            return NextResponse.json({
                success: false,
                message: "Please LogIn to use this Service"
            }, { status: 401 });
        }

        const body = await req.json();
        const { userquery, chatname, chatdata } = body;
        
        console.log("📝 User query:", userquery);
        console.log("💬 Chat name:", chatname);

        // Connect to Astra DB
        const dbcollection = await connectdb();
        
        // Search for relevant documents
        const documents = await dbcollection.find(
            {
                chat_name: chatname,
                userid: User.id
            },
            {
                limit: 3
            }
        ).toArray();

        console.log("📚 Found documents:", documents.length);
        console.log("doucment", documents);

        if (documents.length === 0) {
            return NextResponse.json({
                success: false,
                message: "No documents found for this chat. Please upload a PDF first."
            }, { status: 404 });
        }

        // Build context from documents
        const context = documents
            .map(doc => doc.description)
            .join("\n\n");

        // Build conversation history
        const conversationHistory = (chatdata || [])
            .map(msg => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.message}`)
            .join("\n");

        // Create a simple response based on context
        // For now, return a formatted response until we add proper AI
        const response = `Based on your PDF about ${chatname}, here's what I found related to "${userquery}":\n\n${context.substring(0, 500)}...\n\nThis information comes from your uploaded document.`;

        console.log("✅ Response generated");

        // ✅ THIS IS THE KEY - Return in the correct format
        return NextResponse.json({
            success: true,
            data: response  // Frontend expects response in "data" field
        });

    } catch (error) {
        console.error("❌ ERROR:", error.name);
        console.error("❌ MESSAGE:", error.message);
        console.error("❌ STACK:", error.stack);
        
        return NextResponse.json({
            success: false,
            message: error.message || "Failed to process chat request"
        }, { status: 500 });
    }
};

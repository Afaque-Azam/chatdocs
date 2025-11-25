"use client";
import React, { useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import { FileUpload } from "@/components/ui/file-upload";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useRouter } from "next/navigation";
import Dialog from '@mui/material/Dialog';
import Link from "next/link";

// Set the workerSrc to a CDN path
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`; 

const Uploader = () => {
  const router = useRouter();

  const [FileText, SetFileText] = useState<string>("");
  const [FileName, SetFileName] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [Totalpages,SetTotalpages] = useState<number>(0);
  const [chatdialog, setChatdialog] = useState(false);
  const [prevchats, setPrevchats] = useState<any[]>([]);
  const [Loading,SetLoading] = useState(false);

  const pdfextractor = async (files: File[]) => {
    const file = files[0];
    console.log("file", file);
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async function () {
      const typedarray = new Uint8Array(reader.result as ArrayBuffer);

      try {
        const pdf = await pdfjsLib.getDocument({ data: typedarray }).promise;
        let extractedText = ""; // Initialize an empty string to store the extracted text
        SetTotalpages(pdf.numPages);
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          const textItems = textContent.items.map((item: any) => item.str);
          extractedText += textItems.join(" ") ;
        }
        console.log("extractedText", extractedText);
        SetFileText(extractedText); 
      } catch (err) {
        console.error("Error reading PDF:", err);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const sanitizeChatName = (name: string): string => {
    return name
      .toLowerCase() 
      .trim() 
      .replace(/[^a-z0-9\s-]/g, "") 
      .replace(/\s+/g, "-"); 
  };

  const submitFile = async (chname:string) => {
    try {
      const {data} = await axios.post("/api/uploadfile",{
        filetext: FileText,
        filename:chname,
        totalpages:Totalpages
      })
      console.log(data);
      if(data.success == true){
        router.push(`/playground/chat/${chname}`);
      }else{
        toast.error(" Something went Wrong ", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
      }
      setOpen(false);
    } catch (error) {
      console.log(error);
      setOpen(false);
    }
  };

  const findthechatname = async ()=>{
    try {
      setOpen(true);
      if(FileText == ""){
        setOpen(false);
        toast.error("Please upload a file", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
        return;
      }
      const chname = sanitizeChatName(FileName);
      console.log(chname);
      const {data} = await axios.post("api/findchatname",{
        filename:chname
      })
      console.log(data);
      if(data.success){
        submitFile(chname);
      }else{
        setOpen(false);
        toast.error(data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
      }
    } catch (error) {
      setOpen(false);
      console.log(error);
    }
  }

  const getprevchats = async()=>{
    try {
      SetLoading(true);
      setChatdialog(true);
      const {data} = await axios.get("/api/getchatname")
      console.log(data);
      setPrevchats(data.data);
      SetLoading(false);
    } catch (error) {
      SetLoading(false);
      console.log(error);
    }
  }

  return (
    <>
     <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Dialog open={chatdialog} onClose={() => setChatdialog(false)}  fullWidth={true}  >
        <div className="w-full min-h-[50vh] bg-gray-900  text-white flex flex-col  items-center " >
          <h2 className="text-center mt-[1rem] text-[1.5rem] font-bold "  >Chat Names</h2>
          <div className="flex w-full  flex-col items-center    gap-[0.8rem] py-[2rem] mt-[1rem] overflow-y-scroll h-[40vh] allchat" >
           {
            Loading?
            <h2 className="text-[2rem] font-bold m-auto "  >Loading...</h2>:
            prevchats.map((i:{chatname:String},index:any)=>{
              return(
                <div key={index} className="flex justify-between w-[90%]   bg-gray-800 p-[0.5rem] items-center rounded-[0.5rem] text-[1.2rem] cursor-pointer hover:scale-[1.01] transition-all font-semibold  " >
                <h3>{i.chatname}</h3>
                <Link className="p-[0.3rem] bg-[#fffefe1c] rounded-[3px]  font-semibold  "   href={`/playground/chat/${i.chatname}`} >Select the Chat</Link>
              </div>
              )
            })
           }
          </div>
        </div>
      </Dialog>
      <div className="mt-[3rem] flex w-[90%] m-auto justify-center flex-col max-tablet:gap-[2rem] ">
        <div className=" w-full flex justify-between items-center " >
          <input type="text" placeholder="Name this PDF chat session" className="bg-[#fffefe1c]  w-[30%] text-[1.3rem] py-[0.5rem] px-[1rem] rounded-[5px] max-tablet:w-[50%] " onChange={(e)=>SetFileName(e.target.value)}/>
          <div>
            <button className="px-[1rem] py-[0.5rem] bg-[#fffefe1c] text-[1.5rem]  rounded-[5px] cursor-pointer hover:scale-[1.02] transition-all " onClick={getprevchats} >🕘 Previous Chats</button>
          </div>
        </div>
        <FileUpload onChange={pdfextractor} />
        <div className="w-full mt-[1rem] flex justify-center items-center">
          <button
            onClick={findthechatname}
            className="m-auto w-fit bg-[#fffefe1c] px-[5rem] py-[0.8rem] rounded-[1rem] font-semibold text-[1.5rem] hover:scale-[1.02] transition-all cursor-pointer"
          >
            Submit the file
          </button>
        </div>
        <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        />
      </div>
    </>
  );
};

export default Uploader;

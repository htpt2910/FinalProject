import { comfortaa } from "@/libs/font"
import Image from "next/image"

interface UploadAreaProps {
  image: Blob | undefined
  handleUploadImage: (event: any) => void
  handleUploadToServer: () => void
}

export const UploadArea = ({
  image,
  handleUploadImage,
  handleUploadToServer,
}: UploadAreaProps) => {
  return (
    <div className="pt-32 px-96">
      {/* upload image field */}
      <div
        className={
          "flex relative bg-gray-50 w-[45rem] h-96 border-orange-300 border-2 rounded-md " +
          (image === undefined
            ? "justify-center items-center opacity-50"
            : "justify-end items-start ")
        }
      >
        {image && <Image src={URL.createObjectURL(image)} alt="image" fill />}

        <label
          htmlFor="file-upload"
          className={
            "flex z-50 p-2 " +
            (image === undefined ? "" : "bg-orange-300 text-amber-100 ")
          }
        >
          <span className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6 "
              x-tooltip="tooltip"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
              />
            </svg>
          </span>
          {image === undefined ? "Click here to upload image" : ""}
        </label>

        <input
          id="file-upload"
          type="file"
          className="hidden"
          onChange={handleUploadImage}
        />
      </div>
      <button
        onClick={handleUploadToServer}
        className={
          "relative border-2 rounded-md border-orange-300 bg-orange-300 text-orange-50 text-center w-[45rem] mt-2 p-1 " +
          comfortaa.className
        }
      >
        Ship It!
      </button>
    </div>
  )
}

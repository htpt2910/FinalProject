import Image from "next/image"
import ServiceImage from "../assets/service.png"
import { montserrat } from "@/libs/font"
export default function ServicePage() {
  return (
    <div className="pt-32 mx-32 h-screen bg-orange-50 ">
      <Image
        src={ServiceImage}
        alt="alt"
        width={1500}
        height={500}
        className="rounded-lg"
      />
      <div className="mb-20 bg-orange-50 ">
        <p
          className={
            "text-center my-20 text-xl mx-32 text-orange-400 " +
            montserrat.className
          }
        >{`Wanna book your baby a meeting? Write your information here and we'll get to you in no time`}</p>
        <div className="mx-72">
          <table className="text-left">
            <tr>
              <th>Destination:</th>
              <th>
                <input type="checkbox" />
                At home
                {/* if at home on checked -> show a field ask the user to write in there address and phone number */}
                <input type="checkbox" />
                At store
                {/* if at store on checked -> show a field to give user our address (for sure) */}
              </th>
            </tr>
            <tr>
              <th>Meeting day:</th>
              <th>
                <input type="date" />
              </th>
            </tr>
            Pet information
            <tr>
              <th>Breed:</th>
              <th>
                <input type="text" placeholder="pet's breed..." />
              </th>
            </tr>
            <tr>
              <th>Age: </th>
              <th>
                <input type="text" placeholder="pet's age (in months)..." />
              </th>
            </tr>
            <tr>
              <th>History sickness: </th>
              <th>
                <input type="text" placeholder="sicks in the past..." />
              </th>
            </tr>
            <tr>
              <th>Services</th>
              <th>
                <input type="checkbox" />
                Cutting
                <input type="checkbox" />
                Shower
                <input type="checkbox" />
                Homestay
              </th>
            </tr>
          </table>
        </div>
        <div className="flex justify-center">
          <button className="bg-teal-100 border-2 border-teal-500 text-teal-500 rounded-lg px-3 py-2 mr-2">
            Reset
          </button>
          <button className="bg-teal-500 border-2 border-teal-500 text-white rounded-lg px-3 py-2">
            Book
          </button>
        </div>
      </div>
    </div>
  )
}

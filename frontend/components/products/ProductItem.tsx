import { comfortaa } from "@/libs/font"
import { Dog } from "@/libs/types"

interface ProductItemProps {
  editMode: boolean
  field: string
  content?: string | number
  name: string
  placeholder?: string
  handleChange: (event: any) => void
}

export const ProductItem = ({
  editMode,
  field,
  content,
  name,
  handleChange,
  placeholder = "",
}: ProductItemProps) => {
  return (
    <tr className="">
      <td className="text-start w-24 my-5 px-5 ">{field}</td>

      <td
        className={"text-start w-full font-bold ml-10   " + comfortaa.className}
      >
        {editMode ? (
          <textarea
            name={name}
            value={content === undefined ? "" : content}
            placeholder={placeholder}
            className="w-full overflow-scroll "
            onChange={handleChange}
          />
        ) : (
          content
        )}
      </td>
    </tr>
  )
}

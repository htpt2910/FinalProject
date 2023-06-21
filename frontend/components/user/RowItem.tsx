import { montserrat, ubuntu } from "@/libs/font"
import { User } from "@/libs/types"

interface RowItemProps {
  value: string | undefined
  field: string | undefined
  handleChange: (e: any) => void
}

export const RowItem = ({ value, field, handleChange }: RowItemProps) => {
  return (
    <tr>
      <th>
        <label className={"flex text-start " + ubuntu.className}>
          {field}:
        </label>
      </th>
      <th>
        {field === "Email" ? (
          <input
            type="text"
            value={value}
            className={
              "ml-10 w-[20rem] border-none rounded-lg  opacity-40 " +
              montserrat.className
            }
            disabled
          />
        ) : (
          <input
            type="text"
            name={field?.toLowerCase()}
            value={value}
            className={
              "ml-10 my-2 w-[20rem] border-none rounded-lg  opacity-70 " +
              montserrat.className
            }
            onChange={handleChange}
          />
        )}
      </th>
    </tr>
  )
}

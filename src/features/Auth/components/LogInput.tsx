import { type ChangeEvent, type ReactNode } from "react";
type Inputs = {
  name: string;
  email?: string;
  password: string;
  confirmPass?: string;
};
type props = {
  label: string;
  inputValue: string | undefined;
  setInputs: (value: {
    name: string;
    email?: string;
    password: string;
    confirmPass?: string;
  }) => void;
  inputs: Inputs;
  icon: ReactNode;
  field: keyof Inputs;
  alert?: string | null;
  type?: string;
};
export default function LogInput({
  label,
  inputValue,
  setInputs,
  inputs,
  field,
  icon,
  alert,
  type = "text",
}: props) {
  return (
    <>
      <div className="flex gap-1.5 items-center text-xl lg:text-2xl mb-2.5">
        {icon}
        <p>{label}</p>
      </div>

      {alert && <p className="text-red-600">{alert}</p>}
      <input
        className="rounded-lg p-0.5 text-lg mb-2. focus:border-pink-600 text-black bg-white border-black border-2"
        value={inputValue}
        onChange={async (e: ChangeEvent<HTMLInputElement>) => {
          setInputs({ ...inputs, [field]: e.target.value });
        }}
        type={type}
      />
    </>
  );
}

import { useEffect, useState } from "react";
import { User, Mail, Check, X, Edit3, LogOut } from "lucide-react";

interface ProfileProps {
  props: {
    userId: string;
    fullName?: string;
    Gender?: "M" | "F" | "O";
    dob?: Date;
    gmail?: string;
    role?: string;
    theme?: string;
  };
}

const ProfilePage = ({ props }: ProfileProps) => {
  const storeName: string = import.meta.env.VITE_STORE_NAME || "STORE";
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: props.fullName || "",
    gmail: props.gmail || "",
    gender: props.Gender || "O",
  });

  useEffect(() => {
    document.title = `${storeName} | Me`;
  }, [storeName]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => setIsEditing(false);

  const handleCancel = () => {
    setFormData({
      fullName: props.fullName || "",
      gmail: props.gmail || "",
      gender: props.Gender || "O",
    });
    setIsEditing(false);
  };

  return (
    <div className="max-w-lg mx-auto min-h-screen bg-gray-50/50 pb-32 font-sans antialiased">
      <div className="h-40 bg-zinc-900 w-full relative">
        <button
          type="button"
          onClick={isEditing ? handleSave : () => setIsEditing(true)}
          className={`absolute -bottom-6 right-8 p-4 rounded-full shadow-2xl transition-all active:scale-90 z-20 border-4 border-gray-50 ${
            isEditing ? "bg-blue-600 text-white" : "bg-white text-zinc-800"
          }`}
        >
          {isEditing ? <Check size={22} /> : <Edit3 size={22} />}
        </button>
      </div>

      <div className="px-6 -mt-16 relative z-10">
        <div className="bg-white rounded-[2.5rem] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] p-8 border border-zinc-100">
          <div className="flex flex-col items-center mb-10">
            <div className="w-28 h-28 bg-linear-to-br from-zinc-100 to-zinc-200 rounded-full border-[6px] border-white flex items-center justify-center text-4xl font-bold text-zinc-400 shadow-sm overflow-hidden">
              {formData.fullName.charAt(0).toUpperCase() ||
                `${import.meta.env.VITE_STORE_NAME[0]}`}
            </div>
            <h2 className="mt-4 text-2xl font-bold text-zinc-800 tracking-tight">
              {formData.fullName || `${import.meta.env.VITE_STORE_NAME}`}
            </h2>
            <p className="px-4 py-1.5 mt-2 bg-zinc-100/80 text-zinc-500 text-[11px] font-bold rounded-full uppercase tracking-[0.15em]">
              {props.role || "Member"}
            </p>
          </div>

          <form className="space-y-6">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider ml-1">
                Full Name
              </label>
              <div className="relative">
                <User
                  className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${isEditing ? "text-blue-500" : "text-zinc-300"}`}
                />
                <input
                  name="fullName"
                  type="text"
                  readOnly={!isEditing}
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`w-full rounded-2xl py-3.5 pl-12 pr-4 transition-all duration-300 outline-none border-2 ${
                    isEditing
                      ? "bg-white border-blue-100 ring-4 ring-blue-50/50 text-zinc-800 shadow-sm"
                      : "bg-zinc-50/50 border-transparent text-zinc-500 cursor-default"
                  }`}
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider ml-1">
                Email Address
              </label>
              <div className="relative">
                <Mail
                  className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${isEditing ? "text-blue-500" : "text-zinc-300"}`}
                />
                <input
                  name="gmail"
                  type="email"
                  readOnly={!isEditing}
                  value={formData.gmail}
                  onChange={handleChange}
                  className={`w-full rounded-2xl py-3.5 pl-12 pr-4 transition-all duration-300 outline-none border-2 ${
                    isEditing
                      ? "bg-white border-blue-100 ring-4 ring-blue-50/50 text-zinc-800 shadow-sm"
                      : "bg-zinc-50/50 border-transparent text-zinc-500 cursor-default"
                  }`}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5 pt-2">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider ml-1">
                  Gender
                </label>
                {isEditing ? (
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full bg-white border-2 border-blue-100 ring-4 ring-blue-50/50 rounded-2xl py-3.5 px-4 text-zinc-800 outline-none appearance-none cursor-pointer"
                  >
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                    <option value="O">Other</option>
                  </select>
                ) : (
                  <div className="bg-zinc-50/50 border-2 border-transparent rounded-2xl py-3.5 px-5 text-zinc-500 font-medium">
                    {formData.gender === "M"
                      ? "Male"
                      : formData.gender === "F"
                        ? "Female"
                        : "Other"}
                  </div>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider ml-1">
                  Account ID
                </label>
                <div className="bg-zinc-50/50 border-2 border-transparent rounded-2xl py-3.5 px-5 text-zinc-400 font-mono text-xs flex items-center justify-center truncate">
                  #{props.userId.slice(-6).toUpperCase()}
                </div>
              </div>
            </div>

            <div className="pt-10 space-y-4">
              {isEditing ? (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="group w-full flex items-center justify-center gap-2 bg-white border-2 border-red-50 text-red-500 font-bold py-4 rounded-2xl active:scale-95 transition-all hover:bg-red-50/50"
                >
                  <X size={18} /> Cancel Editing
                </button>
              ) : (
                <button
                  type="button"
                  className="group w-full flex items-center justify-center gap-2 bg-white border-2 border-zinc-100 text-zinc-400 font-bold py-4 rounded-2xl active:scale-95 transition-all hover:bg-zinc-50 hover:text-zinc-600 hover:border-zinc-200"
                >
                  <LogOut
                    size={18}
                    className="group-hover:rotate-12 transition-transform"
                  />{" "}
                  Logout
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

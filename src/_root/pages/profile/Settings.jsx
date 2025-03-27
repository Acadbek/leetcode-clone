import { useState } from "react";
import {
  User,
  Award,
  Settings,
  FlaskRoundIcon as Flask,
  Shield,
  Bell,
  CreditCard,
  ExternalLink,
  Camera,
  RotateCcwIcon,
  RotateCcw,
  LucideRotateCcw,
  RotateCw,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";

export default function ProfileSettings() {
  const [activeTab, setActiveTab] = useState("basic-info");
  const [open, setOpen] = useState(false);
  const [scale, setScale] = useState(1); // Zoom darajasi
  const [rotation, setRotation] = useState(0); // Rotation angle

  const profileData = {
    name: "Asadbek Nosirjonov",
    leetcodeId: "a_nosirjonov",
    gender: "Not provided",
    location: "Your location",
    birthday: "Your birthday",
    summary: "Tell us about yourself (interests, experience, etc.)",
    website: "https://www.linkedin.com/in/someone/",
    github: "https://github.com/someone",
    linkedin: "Your LinkedIn username or url",
    twitter: "Your X (formerly Twitter) username or url",
  };

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-gray-800 to-gray-900">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <div className="flex items-center justify-center rounded-lg">
            <div className="w-[200px] h-[200px] overflow-hidden rounded-lg border-2">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-MMV8r0RvdI34Qs0089PJxWLm0Pxu27.png"
                alt="Profile picture"
                className="object-cover w-[200px] h-[200px] z-10 rounded-lg"
                style={{
                  transform: `scale(${scale}) rotate(${rotation}deg)`,
                }}
              />
            </div>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Button onClick={() => setRotation((prev) => prev - 90)}>
              <RotateCcw />
            </Button>
            <Button onClick={() => setRotation((prev) => prev + 90)}>
              <RotateCw />
            </Button>
            <Button
              onClick={() => {
                setScale(1);
                setRotation(0);
              }}
            >
              Reset
            </Button>
          </div>
          <Slider
            onValueChange={(value) => setScale(value[0])}
            defaultValue={[scale]}
            max={2}
            min={0.2}
            step={0.1}
            className="my-2"
          />
          <label
            for="uploadFile1"
            class="flex text-black dark:text-white text-sm border font-medium px-2 py-1.5 outline-none rounded w-max cursor-pointer mx-auto"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-4 mr-2 dark:fill-white inline"
              viewBox="0 0 32 32"
            >
              <path
                d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
                data-original="#000"
              />
              <path
                d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
                data-original="#000000"
              />
            </svg>
            Choose image
            <input type="file" id="uploadFile1" class="hidden" />
          </label>
          <DialogFooter className="mt-5">
            <Button
              onClick={() => {
                setOpen(false);
                setScale(1);
                setRotation(0);
              }}
              variant="outline"
              className="h-8 text-red-500"
            >
              Cancel
            </Button>
            <Button
              variant="outline"
              className="h-8 text-blue-500"
              type="submit"
            >
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div className="flex flex-col items-center justify-center p-8 text-white">
        <div
          onClick={() => setOpen(true)}
          className="cursor-pointer relative mb-4 h-32 w-32 overflow-hidden rounded-lg border-4 border-white group"
        >
          {/* Overlay on hover */}
          <div className="absolute flex justify-center items-center inset-0 bg-gray-800 opacity-0 group-hover:opacity-50 transition-opacity duration-300">
            <Camera />
          </div>

          {/* Profile Image */}
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-MMV8r0RvdI34Qs0089PJxWLm0Pxu27.png"
            alt="Profile picture"
            className="object-cover w-full h-full z-10"
          />
        </div>

        <h1 className="text-2xl font-bold">
          {profileData.name} <ExternalLink className="ml-1 inline h-5 w-5" />
        </h1>
        <p className="text-gray-300">LeetCode ID: {profileData.leetcodeId}</p>
      </div>

      <div className="max-w-screen-xl mx-auto">
        <div className="flex flex-1 gap-4 flex-col md:flex-row">
          <div className="w-full md:w-64 rounded-lg md:min-h-[calc(100vh-200px)]">
            <Card className="space-y-1 p-2">
              <SidebarItem
                icon={<User className="h-7 w-5" />}
                label="Basic Info"
                active={activeTab === "basic-info"}
                onClick={() => setActiveTab("basic-info")}
              />
              <SidebarItem
                icon={<Award className="h-7 w-5" />}
                label="Points"
                active={activeTab === "points"}
                onClick={() => setActiveTab("points")}
              />
              <SidebarItem
                icon={<Settings className="h-7 w-5" />}
                label="Account"
                active={activeTab === "account"}
                onClick={() => setActiveTab("account")}
              />
              <SidebarItem
                icon={<Flask className="h-7 w-5" />}
                label="Lab"
                active={activeTab === "lab"}
                onClick={() => setActiveTab("lab")}
              />
              <SidebarItem
                icon={<Shield className="h-7 w-5" />}
                label="Privacy"
                active={activeTab === "privacy"}
                onClick={() => setActiveTab("privacy")}
              />
              <SidebarItem
                icon={<Bell className="h-7 w-5" />}
                label="Notifications"
                active={activeTab === "notifications"}
                onClick={() => setActiveTab("notifications")}
              />
              <SidebarItem
                icon={<CreditCard className="h-7 w-5" />}
                label="Billing"
                active={activeTab === "billing"}
                onClick={() => setActiveTab("billing")}
                external
              />
            </Card>
          </div>

          <div className="flex-1">
            <Card className="p-6">
              <h2 className="mb-6 text-xl font-semibold">Basic Info</h2>
              <div className="space-y-4">
                <ProfileField
                  label="Name"
                  value={profileData.name}
                  onEdit={() => {}}
                />
                <ProfileField
                  label="Gender"
                  value={profileData.gender}
                  onEdit={() => {}}
                />
                <ProfileField
                  label="Location"
                  value={profileData.location}
                  onEdit={() => {}}
                />
                <ProfileField
                  label="Birthday"
                  value={profileData.birthday}
                  onEdit={() => {}}
                />
                <ProfileField
                  label="Summary"
                  value={profileData.summary}
                  onEdit={() => {}}
                  isTextarea
                />
                <ProfileField
                  label="Website"
                  value={profileData.website}
                  onEdit={() => {}}
                  isLink
                />
                <ProfileField
                  label="Github"
                  value={profileData.github}
                  onEdit={() => {}}
                  isLink
                />
                <ProfileField
                  label="LinkedIn"
                  value={profileData.linkedin}
                  onEdit={() => {}}
                />
                <ProfileField
                  label="X (formerly Twitter)"
                  value={profileData.twitter}
                  onEdit={() => {}}
                />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function SidebarItem({ icon, label, active, onClick, external = false }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex dark:hover:bg-gray-900 hover:bg-gray-100 hover:text-blue-500 w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
        active ? "bg-blue-500 dark:bg-gray-800 text-white" : "text-gray-700"
      )}
    >
      {icon}
      <span>{label}</span>
      {external && <ExternalLink className="ml-auto h-4 w-4" />}
    </button>
  );
}

function ProfileField({
  label,
  value,
  onEdit,
  isTextarea = false,
  isLink = false,
}) {
  return (
    <div className="grid grid-cols-1 border-b md:grid-cols-[200px_1fr_100px]">
      <div className="font-medium">{label}</div>
      <div className="text-gray-600">
        {isLink ? (
          <a
            href={value}
            className="text-blue-500 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {value}
          </a>
        ) : isTextarea ? (
          <Textarea
            value={value}
            readOnly
            className="resize-none bg-transparent p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        ) : (
          <Input
            value={value}
            readOnly
            className="border-none bg-transparent p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        )}
      </div>
      <div className="flex items-center gap-2">
        <span className="text-gray-400">+2</span>
        <Button
          variant="outline"
          size="sm"
          onClick={onEdit}
          className="ml-auto"
        >
          Edit
        </Button>
      </div>
      <Separator className="col-span-3 my-2" />
    </div>
  );
}

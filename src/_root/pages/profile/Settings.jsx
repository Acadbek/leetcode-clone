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
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ProfileSettings() {
  const [activeTab, setActiveTab] = useState("basic-info");

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
      <div className="flex flex-col items-center justify-center p-8 text-white">
        <div className="relative mb-4 h-32 w-32 overflow-hidden rounded-lg border-4 border-white">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-MMV8r0RvdI34Qs0089PJxWLm0Pxu27.png"
            alt="Profile picture"
            className="object-cover w-full h-full"
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

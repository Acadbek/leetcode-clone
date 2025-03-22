import ActivityStats from "@/components/Activity"
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const Profile = () => {
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-12 mt-6 gap-4">
        <div className="col-span-3 p-3 border">
          <div className="flex items-center gap-3">
            <img width={80} height={80} className="rounded-lg object-cover" src="https://assets.leetcode.com/users/avatars/avatar_1646426627.png" alt="" />
            <div>
              <h3>Name Lastname</h3>
              <p className="text-sm text-muted-foreground">@username</p>
              <p className="mt-3 text-muted-foreground">Rank: <span className="text-primary">1</span></p>
            </div>
          </div>
          <Button className="mt-6 w-full h-8 bg-[#2B392F] hover:bg-[#2B392F] text-green-500">Edit Profile</Button>

          <h3 className="text-sm font-semibold mt-5">Community Stats</h3>
          <div className="mt-3 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="#1E3A8A" fill-rule="evenodd" d="M1 12c2.028-4.152 6.192-7 11-7s8.972 2.848 11 7c-2.028 4.152-6.192 7-11 7s-8.972-2.848-11-7m11 3.5a3.5 3.5 0 1 0 0-7a3.5 3.5 0 0 0 0 7" /></svg>
              <p className="text-sm text-muted-foreground">Views <span className="text-primary">0</span></p>
            </div>
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="#10B981" d="M1.75 1h12.5c.966 0 1.75.784 1.75 1.75v9.5A1.75 1.75 0 0 1 14.25 14H8.061l-2.574 2.573A1.458 1.458 0 0 1 3 15.543V14H1.75A1.75 1.75 0 0 1 0 12.25v-9.5C0 1.784.784 1 1.75 1M1.5 2.75v9.5c0 .138.112.25.25.25h2a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.75.75 0 0 1 .53-.22h6.5a.25.25 0 0 0 .25-.25v-9.5a.25.25 0 0 0-.25-.25H1.75a.25.25 0 0 0-.25.25" /><path fill="#10B981" d="M22.5 8.75a.25.25 0 0 0-.25-.25h-3.5a.75.75 0 0 1 0-1.5h3.5c.966 0 1.75.784 1.75 1.75v9.5A1.75 1.75 0 0 1 22.25 20H21v1.543a1.457 1.457 0 0 1-2.487 1.03L15.939 20H10.75A1.75 1.75 0 0 1 9 18.25v-1.465a.75.75 0 0 1 1.5 0v1.465c0 .138.112.25.25.25h5.5a.75.75 0 0 1 .53.22l2.72 2.72v-2.19a.75.75 0 0 1 .75-.75h2a.25.25 0 0 0 .25-.25z" /></svg>
              <p className="text-sm text-muted-foreground">Discuss <span className="text-primary">0</span></p>
            </div>
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="#3B82F6" d="m10.6 16.2l7.05-7.05l-1.4-1.4l-5.65 5.65l-2.85-2.85l-1.4 1.4zM5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21z" /></svg>
              <p className="text-sm text-muted-foreground">Solution <span className="text-primary">0</span></p>
            </div>
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="#FACC15" d="m12 17.275l-4.15 2.5q-.275.175-.575.15t-.525-.2t-.35-.437t-.05-.588l1.1-4.725L3.775 10.8q-.25-.225-.312-.513t.037-.562t.3-.45t.55-.225l4.85-.425l1.875-4.45q.125-.3.388-.45t.537-.15t.537.15t.388.45l1.875 4.45l4.85.425q.35.05.55.225t.3.45t.038.563t-.313.512l-3.675 3.175l1.1 4.725q.075.325-.05.588t-.35.437t-.525.2t-.575-.15z" /></svg>
              <p className="text-sm text-muted-foreground">Reputation <span className="text-primary">0</span></p>
            </div>
          </div>

          <h3 className="text-sm font-semibold mt-5">Languages</h3>
          <div className="mt-2 flex flex-wrap gap-1">
            <Badge variant="secondary">Javascript</Badge>
            <Badge variant="secondary">Python</Badge>
            <Badge variant="secondary">C</Badge>
            <Badge variant="secondary">C++</Badge>
            <Badge variant="secondary">Rust</Badge>
            <Badge variant="secondary">Lua</Badge>
          </div>
        </div>
        <div className="col-span-9">
          <ActivityStats

          />
        </div>
      </div>
    </div>
  )
}

export default Profile;
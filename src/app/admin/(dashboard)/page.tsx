import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Image as ImageIcon, MessageSquare, BookOpen, Star } from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    { title: "Total Albums", value: "24", icon: BookOpen, color: "text-blue-500" },
    { title: "Published", value: "18", icon: ImageIcon, color: "text-green-500" },
    { title: "Enquiries", value: "12", icon: MessageSquare, color: "text-orange-500" },
    { title: "Testimonials", value: "8", icon: Star, color: "text-yellow-500" },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Enquiries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">No recent enquiries found.</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Albums</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">No recent albums found.</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

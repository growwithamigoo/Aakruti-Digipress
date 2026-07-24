import { prisma } from "@/lib/prisma";
import { Mail, Phone, Calendar, BookOpen, Clock, Building } from "lucide-react";

export default async function EnquiriesPage() {
  const enquiries = await prisma.enquiry.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Enquiries</h1>
        <p className="text-gray-500 mt-2">Manage customer contact requests and project enquiries.</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {enquiries.length > 0 ? (
          enquiries.map((enquiry) => (
            <div key={enquiry.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col md:flex-row gap-6 hover:shadow-md transition-shadow">
              
              <div className="flex-1 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{enquiry.name}</h2>
                    {enquiry.studioName && (
                      <div className="flex items-center gap-2 text-gray-600 mt-1">
                        <Building className="w-4 h-4" />
                        <span className="font-medium">{enquiry.studioName}</span>
                      </div>
                    )}
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    enquiry.status === "New" ? "bg-blue-100 text-blue-700" :
                    enquiry.status === "Contacted" ? "bg-yellow-100 text-yellow-700" :
                    enquiry.status === "Completed" ? "bg-green-100 text-green-700" :
                    "bg-gray-100 text-gray-700"
                  }`}>
                    {enquiry.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-50">
                  <div className="flex items-center gap-3 text-gray-600">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <a href={`tel:${enquiry.mobile}`} className="hover:text-blue-600 font-medium">{enquiry.mobile}</a>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Clock className="w-5 h-5 text-gray-400" />
                    <span className="text-sm">{new Date(enquiry.createdAt).toLocaleString()}</span>
                  </div>
                </div>

                {(enquiry.occasion || enquiry.albumType) && (
                  <div className="flex flex-wrap gap-4 pt-4">
                    {enquiry.occasion && (
                      <div className="flex items-center gap-2 bg-purple-50 text-purple-700 px-3 py-1.5 rounded-lg text-sm font-medium border border-purple-100">
                        <Calendar className="w-4 h-4" />
                        {enquiry.occasion}
                      </div>
                    )}
                    {enquiry.albumType && (
                      <div className="flex items-center gap-2 bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-lg text-sm font-medium border border-indigo-100">
                        <BookOpen className="w-4 h-4" />
                        {enquiry.albumType}
                      </div>
                    )}
                  </div>
                )}
                
                <div className="bg-gray-50 p-4 rounded-lg mt-4 border border-gray-100">
                  <h3 className="text-xs font-bold uppercase text-gray-500 mb-2 tracking-widest">Message</h3>
                  <p className="text-gray-800 whitespace-pre-wrap">{enquiry.message}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
            <Mail className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No Enquiries Yet</h3>
            <p className="text-gray-500 mt-1">When customers submit contact forms, they will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
}

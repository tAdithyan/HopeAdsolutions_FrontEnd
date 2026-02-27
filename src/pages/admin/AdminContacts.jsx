import { useState, useEffect } from "react";
import { getContacts, deleteContact } from "../../data/contacts";
import { Trash2, Mail, Phone, Calendar, User, Briefcase } from "lucide-react";
import Loading from "../../components/common/Loading";

const AdminContacts = () => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);

    const fetchAllContacts = async () => {
        try {
            setLoading(true);
            const data = await getContacts();
            setContacts(data.data || []);
        } catch (error) {
            console.error("Error fetching contacts:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllContacts();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this contact submission?")) {
            try {
                setActionLoading(true);
                await deleteContact(id);
                await fetchAllContacts();
            } catch (error) {
                console.error("Error deleting contact:", error);
            } finally {
                setActionLoading(false);
            }
        }
    };

    if (loading && contacts.length === 0) {
        return <Loading />;
    }

    return (
        <div>
            {actionLoading && <Loading fullScreen />}
            <div className="flex items-center justify-between mb-8">
                <h1 className="font-['Oswald'] text-3xl font-bold text-[#111827]">Contact Submissions</h1>
                <div className="text-sm font-medium text-gray-500 bg-gray-100 px-4 py-2 rounded-full">
                    Total: {contacts.length}
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {contacts.length === 0 ? (
                    <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm">
                        <Mail className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                        <h3 className="text-lg font-bold text-gray-900">No submissions yet</h3>
                        <p className="text-gray-500 mt-1">New contact form submissions will appear here.</p>
                    </div>
                ) : (
                    contacts.map(contact => (
                        <div key={contact._id} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                            <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-start gap-6">
                                <div className="flex-1 space-y-4">
                                    <div className="flex flex-wrap items-center gap-4">
                                        <div className="flex items-center gap-2 text-[#111827] font-bold">
                                            <User size={18} className="text-[#FF8A00]" />
                                            <span className="text-xl">{contact.name}</span>
                                        </div>
                                        <div className="px-3 py-1 bg-orange-50 text-[#FF8A00] text-xs font-bold rounded-full uppercase tracking-wider">
                                            {contact.service}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-600">
                                        <div className="flex items-center gap-2">
                                            <Mail size={16} />
                                            <a href={`mailto:${contact.email}`} className="hover:text-[#FF8A00] transition-colors">{contact.email}</a>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Phone size={16} />
                                            <a href={`tel:${contact.phone}`} className="hover:text-[#FF8A00] transition-colors">{contact.phone}</a>
                                        </div>
                                        {contact.company && (
                                            <div className="flex items-center gap-2">
                                                <Briefcase size={16} />
                                                <span>{contact.company}</span>
                                            </div>
                                        )}
                                        <div className="flex items-center gap-2">
                                            <Calendar size={16} />
                                            <span>{new Date(contact.createdAt).toLocaleDateString()} at {new Date(contact.createdAt).toLocaleTimeString()}</span>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 rounded-2xl p-4 mt-2">
                                        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{contact.message}</p>
                                    </div>
                                </div>

                                <div className="flex md:flex-col items-center justify-end gap-2">
                                    <button
                                        onClick={() => handleDelete(contact._id)}
                                        className="w-10 h-10 rounded-full bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all"
                                        title="Delete Submission"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default AdminContacts;

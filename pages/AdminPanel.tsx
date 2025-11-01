
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { Developer, Testimonial, Property, Category, Benefit, Service, ContactInfo, IconName } from '../types';
import { Icon } from '../constants';
import { useRouter } from '../context/RouterContext';
import { supabase } from '../supabase/client';

// --- Reusable Modal Component ---
const Modal: React.FC<{ title: string, isOpen: boolean, onClose: () => void, children: React.ReactNode }> = ({ title, isOpen, onClose, children }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-2xl relative">
                <h2 className="text-2xl font-bold text-primary mb-6">{title}</h2>
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-3xl">&times;</button>
                {children}
            </div>
        </div>
    );
};

// --- Field Definitions for Generic Form ---
type FormField = {
    name: string;
    label: string;
    type: 'text' | 'textarea' | 'number' | 'select' | 'icon-select';
    options?: { value: string; label: string }[];
    required?: boolean;
};

// --- Dashboard Overview Component ---
const DashboardOverview: React.FC = () => {
    const { developers, properties, testimonials, services } = useData();

    const stats = [
        { title: 'Total Developers', value: developers.length, icon: 'BuildingIcon' as IconName, color: 'text-blue-500', bgColor: 'bg-blue-100' },
        { title: 'Total Properties', value: properties.length, icon: 'HomeIcon' as IconName, color: 'text-green-500', bgColor: 'bg-green-100' },
        { title: 'Properties For Sale', value: properties.filter(p => p.listingType === 'For Sale').length, icon: 'DollarSignIcon' as IconName, color: 'text-yellow-500', bgColor: 'bg-yellow-100' },
        { title: 'Properties For Rent', value: properties.filter(p => p.listingType === 'For Rent').length, icon: 'KeyIcon' as IconName, color: 'text-indigo-500', bgColor: 'bg-indigo-100' },
        { title: 'Client Testimonials', value: testimonials.length, icon: 'UsersIcon' as IconName, color: 'text-pink-500', bgColor: 'bg-pink-100' },
        { title: 'Available Services', value: services.length, icon: 'BriefcaseIcon' as IconName, color: 'text-purple-500', bgColor: 'bg-purple-100' },
    ];

    const StatCard: React.FC<{ title: string; value: number; icon: IconName; color: string; bgColor: string; }> = ({ title, value, icon, color, bgColor }) => (
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4 transition-transform transform hover:-translate-y-1">
            <div className={`p-3 rounded-full ${bgColor}`}>
                <Icon name={icon} className={`w-8 h-8 ${color}`} />
            </div>
            <div>
                <p className="text-gray-500 text-sm font-medium">{title}</p>
                <p className="text-3xl font-bold text-primary">{value}</p>
            </div>
        </div>
    );

    const recentProperties = [...properties].sort((a, b) => (b.id ?? 0) - (a.id ?? 0)).slice(0, 5);

    return (
        <div>
            <h3 className="text-3xl font-bold text-primary mb-6">Dashboard Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stats.map(stat => <StatCard key={stat.title} {...stat} />)}
            </div>

            <div className="mt-12">
                <h3 className="text-2xl font-bold text-primary mb-4">Recently Added Properties</h3>
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <table className="min-w-full">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-4 text-left font-semibold text-gray-600">Property Title</th>
                                <th className="p-4 text-left font-semibold text-gray-600">Location</th>
                                <th className="p-4 text-left font-semibold text-gray-600">Price</th>
                                <th className="p-4 text-left font-semibold text-gray-600">Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentProperties.map(prop => (
                                <tr key={prop.id} className="border-b hover:bg-gray-50">
                                    <td className="p-4 font-medium text-primary">{prop.title}</td>
                                    <td className="p-4 text-gray-700">{prop.location}</td>
                                    <td className="p-4 text-gray-700">₱{prop.price.toLocaleString()}</td>
                                    <td className="p-4 text-gray-700">{prop.listingType}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};


// --- Generic Section Management Component ---
const ManageSection: React.FC<{
    title: string;
    items: any[];
    onSave: (item: any) => Promise<void>;
    onDelete: (id: number) => Promise<void>;
    formFields: FormField[];
    displayColumns: { header: string; accessor: (item: any) => React.ReactNode }[];
    noun: string;
}> = ({ title, items, onSave, onDelete, formFields, displayColumns, noun }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState<any | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    const openModal = (item: any | null = null) => {
        const initialItem = formFields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {});
        setCurrentItem(item || initialItem);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentItem(null);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentItem) return;
        setIsSaving(true);
        try {
            await onSave(currentItem);
            closeModal();
        } catch (error) {
            const errorMessage = (error && typeof error === 'object' && 'message' in error) ? String(error.message) : JSON.stringify(error);
            console.error(`Error saving ${noun}:`, error);
            alert(`Failed to save ${noun}. Error: ${errorMessage}`);
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (window.confirm(`Are you sure you want to delete this ${noun}?`)) {
            try {
                await onDelete(id);
            } catch (error) {
                 const errorMessage = (error && typeof error === 'object' && 'message' in error) ? String(error.message) : JSON.stringify(error);
                 console.error(`Error deleting ${noun}:`, error);
                 alert(`Failed to delete ${noun}. Error: ${errorMessage}`);
            }
        }
    };
    
    const handleChange = (name: string, value: any) => {
        setCurrentItem({ ...currentItem, [name]: value });
    };

    const allIconNames: IconName[] = ['HomeIcon', 'BuildingIcon', 'MapPinIcon', 'StoreIcon', 'CollectionIcon', 'ClockIcon', 'BenefitCheckIcon', 'BenefitDealIcon', 'BenefitThumbsUpIcon', 'ServiceBuyIcon', 'ServiceSellIcon', 'ServiceFinanceIcon', 'ServiceInvestIcon'];

    return (
        <div>
             <div className="flex justify-between items-center mb-6">
                <h3 className="text-3xl font-bold text-primary">{title}</h3>
                <button onClick={() => openModal()} className="bg-secondary text-white px-6 py-2 rounded-md font-semibold hover:bg-opacity-90">Add {noun}</button>
            </div>
             <div className="bg-white shadow-md rounded-lg overflow-hidden">
                 <table className="min-w-full">
                     <thead className="bg-gray-100">
                        <tr>
                            {displayColumns.map(col => <th key={col.header} className="p-4 text-left font-semibold text-gray-600">{col.header}</th>)}
                            <th className="p-4 text-left font-semibold text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map(item => (
                            <tr key={item.id} className="border-b hover:bg-gray-50">
                               {displayColumns.map(col => <td key={col.header} className="p-4 align-top">{col.accessor(item)}</td>)}
                                <td className="p-4 align-top">
                                    <button onClick={() => openModal(item)} className="text-blue-600 hover:underline mr-4">Edit</button>
                                    <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:underline">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                 </table>
            </div>

            <Modal title={currentItem?.id ? `Edit ${noun}` : `Add ${noun}`} isOpen={isModalOpen} onClose={closeModal}>
                <form onSubmit={handleSave} className="space-y-4">
                    {formFields.map(field => (
                        <div key={field.name}>
                            <label className="block text-sm font-medium text-gray-700">{field.label}</label>
                            {field.type === 'textarea' ? (
                                <textarea value={currentItem?.[field.name] || ''} onChange={e => handleChange(field.name, e.target.value)} className="w-full p-2 border rounded-md" required={field.required} rows={3}/>
                            ) : field.type === 'select' ? (
                                <select value={currentItem?.[field.name] || ''} onChange={e => handleChange(field.name, e.target.value)} className="w-full p-2 border rounded-md bg-white" required={field.required}>
                                    {field.options?.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                                </select>
                            ) : field.type === 'icon-select' ? (
                                <select value={currentItem?.[field.name] || ''} onChange={e => handleChange(field.name, e.target.value)} className="w-full p-2 border rounded-md bg-white" required={field.required}>
                                    <option value="">Select Icon</option>
                                    {allIconNames.map(iconName => <option key={iconName} value={iconName}>{iconName}</option>)}
                                </select>
                            ) : (
                                <input type={field.type} value={currentItem?.[field.name] || ''} onChange={e => handleChange(field.name, field.type === 'number' ? parseFloat(e.target.value) || 0 : e.target.value)} className="w-full p-2 border rounded-md" required={field.required} min={field.type === 'number' ? 0 : undefined}/>
                            )}
                        </div>
                    ))}
                    <button type="submit" disabled={isSaving} className="w-full bg-secondary text-white py-3 rounded-md font-bold mt-4 disabled:bg-gray-400">
                        {isSaving ? 'Saving...' : 'Save'}
                    </button>
                </form>
            </Modal>
        </div>
    );
};

// --- Sub-component for managing Developers ---
const ManageDevelopers: React.FC = () => {
    const { developers, setDevelopers } = useData();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentDeveloper, setCurrentDeveloper] = useState<Partial<Developer> | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    const openModal = (dev: Partial<Developer> | null = null) => {
        const developerData = dev || { name: '', logoUrl: '', badge: '', projects: [] };
        setCurrentDeveloper(developerData);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentDeveloper(null);
    };
    
    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentDeveloper) return;
        setIsSaving(true);
        try {
            const developerData = {
                name: currentDeveloper.name,
                logoUrl: currentDeveloper.logoUrl,
                badge: currentDeveloper.badge || null,
            };

            if (currentDeveloper.id) { // Update
                const { data, error } = await supabase.from('developers').update(developerData).eq('id', currentDeveloper.id).select().single();
                if (error) throw error;
                setDevelopers(prev => prev.map(d => d.id === data.id ? { ...d, ...data } : d));
            } else { // Insert
                const { data, error } = await supabase.from('developers').insert(developerData).select().single();
                if (error) throw error;
                setDevelopers(prev => [...prev, { ...data, projects: [] } as Developer]);
            }
            closeModal();
        } catch (error) {
            const errorMessage = (error && typeof error === 'object' && 'message' in error) ? String(error.message) : JSON.stringify(error);
            console.error('Error saving developer:', error);
            alert(`Failed to save developer. Error: ${errorMessage}`);
        } finally {
            setIsSaving(false);
        }
    };
    
    const handleDelete = async (id: number) => {
        if (!window.confirm('Are you sure you want to delete this developer? This might affect properties associated with it.')) return;
        
        try {
            const { error } = await supabase.from('developers').delete().eq('id', id);
            if (error) throw error;
            setDevelopers(prev => prev.filter(d => d.id !== id));
        } catch (error) {
            const errorMessage = (error && typeof error === 'object' && 'message' in error) ? String(error.message) : JSON.stringify(error);
            console.error('Error deleting developer:', error);
            alert(`Failed to delete developer. Error: ${errorMessage}`);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-3xl font-bold text-primary">Developers</h3>
                <button onClick={() => openModal()} className="bg-secondary text-white px-6 py-2 rounded-md font-semibold hover:bg-opacity-90">Add Developer</button>
            </div>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-4 text-left font-semibold text-gray-600">Logo</th>
                            <th className="p-4 text-left font-semibold text-gray-600">Name</th>
                            <th className="p-4 text-left font-semibold text-gray-600">Badge</th>
                            <th className="p-4 text-left font-semibold text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {developers.map(dev => (
                            <tr key={dev.id} className="border-b hover:bg-gray-50">
                                <td className="p-4"><img src={dev.logoUrl} alt={dev.name} className="h-10 w-auto bg-gray-200 p-1 rounded"/></td>
                                <td className="p-4 font-medium text-primary">{dev.name}</td>
                                <td className="p-4">{dev.badge}</td>
                                <td className="p-4">
                                    <button onClick={() => openModal(dev)} className="text-blue-600 hover:underline mr-4">Edit</button>
                                    <button onClick={() => handleDelete(dev.id)} className="text-red-600 hover:underline">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Modal title={currentDeveloper?.id ? 'Edit Developer' : 'Add Developer'} isOpen={isModalOpen} onClose={closeModal}>
                <form onSubmit={handleSave} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input type="text" value={currentDeveloper?.name || ''} onChange={e => setCurrentDeveloper({...currentDeveloper, name: e.target.value})} className="w-full p-2 border rounded-md" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Logo URL</label>
                        <input type="url" placeholder="https://example.com/logo.png" value={currentDeveloper?.logoUrl || ''} onChange={e => setCurrentDeveloper({...currentDeveloper, logoUrl: e.target.value})} className="w-full p-2 border rounded-md" />
                         {currentDeveloper?.logoUrl && (
                            <div className="mt-2 p-2 border rounded-md inline-block">
                                <img src={currentDeveloper.logoUrl} alt="Logo Preview" className="h-20 w-auto bg-gray-100 rounded-sm" />
                            </div>
                         )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Badge</label>
                         <select value={currentDeveloper?.badge || ''} onChange={e => setCurrentDeveloper({...currentDeveloper, badge: e.target.value as Developer['badge']})} className="w-full p-2 border rounded-md bg-white">
                            <option value="">None</option>
                            <option value="Premium Developer">Premium Developer</option>
                            <option value="Affordable Housing">Affordable Housing</option>
                            <option value="Most Trusted">Most Trusted</option>
                        </select>
                    </div>
                    <button type="submit" disabled={isSaving} className="w-full bg-secondary text-white py-3 rounded-md font-bold mt-4 disabled:bg-gray-400">
                         {isSaving ? 'Saving...' : 'Save'}
                    </button>
                </form>
            </Modal>
        </div>
    );
};

// Sub-component for managing Properties
const ManageProperties: React.FC = () => {
    const { properties, setProperties, developers } = useData();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [current, setCurrent] = useState<Partial<Property> | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    const openModal = (item: Partial<Property> | null = null) => {
        setCurrent(item || { title: '', price: 0, location: '', type: 'Condominium', status: 'Pre-selling', listingType: 'For Sale', imageUrl: '', sqm: 0, bedrooms: 0, bathrooms: 0, developerId: developers[0]?.id || 0, description: '' });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrent(null);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!current) return;
        setIsSaving(true);

        try {
            const propertyData = {
                title: current.title,
                price: current.price,
                location: current.location,
                type: current.type,
                status: current.status,
                listingType: current.listingType,
                imageUrl: current.imageUrl,
                sqm: current.sqm,
                bedrooms: current.bedrooms,
                bathrooms: current.bathrooms,
                developerId: current.developerId,
                description: current.description || null,
            };

            if (current.id) { // Update
                const { data, error } = await supabase.from('properties').update(propertyData).eq('id', current.id).select().single();
                if (error) throw error;
                setProperties(prev => prev.map(p => p.id === data.id ? data : p));
            } else { // Insert
                const { data, error } = await supabase.from('properties').insert(propertyData).select().single();
                if (error) throw error;
                setProperties(prev => [...prev, data]);
            }
            closeModal();
        } catch (error) {
            const errorMessage = (error && typeof error === 'object' && 'message' in error) ? String(error.message) : JSON.stringify(error);
            console.error('Error saving property:', error);
            alert(`Failed to save property. Error: ${errorMessage}`);
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this property?')) {
            try {
                const { error } = await supabase.from('properties').delete().eq('id', id);
                if (error) throw error;
                setProperties(prev => prev.filter(p => p.id !== id));
            } catch (error) {
                const errorMessage = (error && typeof error === 'object' && 'message' in error) ? String(error.message) : JSON.stringify(error);
                console.error('Error deleting property:', error);
                alert(`Failed to delete property. Error: ${errorMessage}`);
            }
        }
    };

    const getDeveloperName = (id: number) => developers.find(d => d.id === id)?.name || 'N/A';
    
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-3xl font-bold text-primary">Properties</h3>
                <button onClick={() => openModal()} className="bg-secondary text-white px-6 py-2 rounded-md font-semibold hover:bg-opacity-90">Add Property</button>
            </div>
             <div className="bg-white shadow-md rounded-lg overflow-hidden">
                 <table className="min-w-full">
                     <thead className="bg-gray-100">
                        <tr>
                            <th className="p-4 text-left font-semibold text-gray-600">Title</th>
                            <th className="p-4 text-left font-semibold text-gray-600">Price</th>
                            <th className="p-4 text-left font-semibold text-gray-600">Location</th>
                            <th className="p-4 text-left font-semibold text-gray-600">Developer</th>
                            <th className="p-4 text-left font-semibold text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {properties.map(item => (
                            <tr key={item.id} className="border-b hover:bg-gray-50">
                                <td className="p-4 font-medium text-primary">{item.title}</td>
                                <td className="p-4">₱{item.price.toLocaleString()}</td>
                                <td className="p-4">{item.location}</td>
                                <td className="p-4">{getDeveloperName(item.developerId)}</td>
                                <td className="p-4">
                                    <button onClick={() => openModal(item)} className="text-blue-600 hover:underline mr-4">Edit</button>
                                    <button onClick={() => handleDelete(item.id!)} className="text-red-600 hover:underline">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                 </table>
            </div>

            <Modal title={current?.id ? 'Edit Property' : 'Add Property'} isOpen={isModalOpen} onClose={closeModal}>
                <form onSubmit={handleSave} className="space-y-4 max-h-[70vh] overflow-y-auto pr-4">
                    <div>
                        <label>Title</label>
                        <input type="text" value={current?.title || ''} onChange={e => setCurrent({...current, title: e.target.value})} className="w-full p-2 border rounded-md" required/>
                    </div>
                     <div className="grid grid-cols-2 gap-4">
                        <div><label>Price</label><input type="number" value={current?.price ?? ''} onChange={e => setCurrent({...current, price: parseFloat(e.target.value) || 0})} className="w-full p-2 border rounded-md" required/></div>
                        <div><label>Location</label><input type="text" value={current?.location || ''} onChange={e => setCurrent({...current, location: e.target.value})} className="w-full p-2 border rounded-md" required/></div>
                    </div>
                     <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label>Property Type</label>
                            <select value={current?.type} onChange={e => setCurrent({...current, type: e.target.value as Property['type']})} className="w-full p-2 border rounded-md bg-white">
                                <option>House & Lot</option><option>Condominium</option><option>Lot Only</option><option>Commercial</option><option>Townhouse</option>
                            </select>
                        </div>
                        <div>
                            <label>Developer</label>
                            <select value={current?.developerId} onChange={e => setCurrent({...current, developerId: parseInt(e.target.value)})} className="w-full p-2 border rounded-md bg-white">
                                {developers.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label>Listing Type</label>
                            <select value={current?.listingType} onChange={e => setCurrent({...current, listingType: e.target.value as Property['listingType']})} className="w-full p-2 border rounded-md bg-white">
                                <option>For Sale</option><option>For Rent</option>
                            </select>
                        </div>
                        <div>
                            <label>Status</label>
                            <select value={current?.status} onChange={e => setCurrent({...current, status: e.target.value as Property['status']})} className="w-full p-2 border rounded-md bg-white">
                                <option>Pre-selling</option><option>Ready for Occupancy</option>
                            </select>
                        </div>
                    </div>
                     <div className="grid grid-cols-3 gap-4">
                        <div><label>SQM</label><input type="number" value={current?.sqm ?? ''} onChange={e => setCurrent({...current, sqm: parseInt(e.target.value, 10) || 0})} className="w-full p-2 border rounded-md" /></div>
                        <div><label>Bedrooms</label><input type="number" value={current?.bedrooms ?? ''} onChange={e => setCurrent({...current, bedrooms: parseInt(e.target.value, 10) || 0})} className="w-full p-2 border rounded-md" /></div>
                        <div><label>Bathrooms</label><input type="number" value={current?.bathrooms ?? ''} onChange={e => setCurrent({...current, bathrooms: parseInt(e.target.value, 10) || 0})} className="w-full p-2 border rounded-md" /></div>
                    </div>
                     <div>
                        <label>Image URL</label>
                        <input type="text" value={current?.imageUrl || ''} onChange={e => setCurrent({...current, imageUrl: e.target.value})} className="w-full p-2 border rounded-md" required/>
                    </div>
                    <div>
                        <label>Description</label>
                        <textarea value={current?.description || ''} onChange={e => setCurrent({...current, description: e.target.value})} className="w-full p-2 border rounded-md" rows={4}/>
                    </div>
                    <button type="submit" disabled={isSaving} className="w-full bg-secondary text-white py-3 rounded-md font-bold mt-4 disabled:bg-gray-400">
                      {isSaving ? 'Saving...' : 'Save'}
                    </button>
                </form>
            </Modal>
        </div>
    );
};

// --- Sub-component for managing Testimonials ---
const ManageTestimonials: React.FC = () => {
    const { testimonials, setTestimonials } = useData();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [current, setCurrent] = useState<Partial<Testimonial> | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    const openModal = (item: Partial<Testimonial> | null = null) => {
        setCurrent(item || { quote: '', clientName: '', clientRole: '', clientImage: '', rating: 5 });
        setIsModalOpen(true);
    };
    
    const closeModal = () => {
        setIsModalOpen(false);
        setCurrent(null);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!current) return;
        setIsSaving(true);
        try {
            const testimonialData = {
                quote: current.quote,
                clientName: current.clientName,
                clientRole: current.clientRole,
                clientImage: current.clientImage,
                rating: current.rating,
            };
            
            if (!testimonialData.rating || isNaN(testimonialData.rating) || testimonialData.rating < 1 || testimonialData.rating > 5) {
                throw new Error("Rating must be a number between 1 and 5.");
            }

            if (current.id) { // Update
                const { data, error } = await supabase.from('testimonials').update(testimonialData).eq('id', current.id).select().single();
                if (error) throw error;
                setTestimonials(prev => prev.map(t => t.id === data.id ? data : t));
            } else { // Insert
                const { data, error } = await supabase.from('testimonials').insert(testimonialData).select().single();
                if (error) throw error;
                setTestimonials(prev => [...prev, data]);
            }
            closeModal();
        } catch (error) {
            const errorMessage = (error && typeof error === 'object' && 'message' in error) ? String(error.message) : JSON.stringify(error);
            console.error('Error saving testimonial:', error);
            alert(`Failed to save testimonial. Error: ${errorMessage}`);
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this testimonial?')) {
            try {
                const { error } = await supabase.from('testimonials').delete().eq('id', id);
                if (error) throw error;
                setTestimonials(prev => prev.filter(t => t.id !== id));
            } catch (error) {
                const errorMessage = (error && typeof error === 'object' && 'message' in error) ? String(error.message) : JSON.stringify(error);
                console.error('Error deleting testimonial:', error);
                alert(`Failed to delete testimonial. Error: ${errorMessage}`);
            }
        }
    };
    
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-3xl font-bold text-primary">Testimonials</h3>
                <button onClick={() => openModal()} className="bg-secondary text-white px-6 py-2 rounded-md font-semibold hover:bg-opacity-90">Add Testimonial</button>
            </div>
             <div className="bg-white shadow-md rounded-lg overflow-hidden">
                 <table className="min-w-full">
                     <thead className="bg-gray-100">
                        <tr>
                            <th className="p-4 text-left font-semibold text-gray-600">Client</th>
                            <th className="p-4 text-left font-semibold text-gray-600">Quote</th>
                            <th className="p-4 text-left font-semibold text-gray-600">Rating</th>
                            <th className="p-4 text-left font-semibold text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {testimonials.map(item => (
                            <tr key={item.id} className="border-b hover:bg-gray-50">
                                <td className="p-4 font-medium text-primary align-top">{item.clientName}</td>
                                <td className="p-4 italic text-gray-600 align-top">"{item.quote.substring(0, 100)}{item.quote.length > 100 ? '...' : ''}"</td>
                                <td className="p-4 align-top">{item.rating}/5</td>
                                <td className="p-4 align-top">
                                    <button onClick={() => openModal(item)} className="text-blue-600 hover:underline mr-4">Edit</button>
                                    <button onClick={() => handleDelete(item.id!)} className="text-red-600 hover:underline">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                 </table>
            </div>
            
            <Modal title={current?.id ? 'Edit Testimonial' : 'Add Testimonial'} isOpen={isModalOpen} onClose={closeModal}>
                <form onSubmit={handleSave} className="space-y-4">
                    <div>
                        <label>Quote</label>
                        <textarea value={current?.quote || ''} onChange={e => setCurrent({...current, quote: e.target.value})} className="w-full p-2 border rounded-md" required rows={3}></textarea>
                    </div>
                    <div>
                        <label>Client Name</label>
                        <input type="text" value={current?.clientName || ''} onChange={e => setCurrent({...current, clientName: e.target.value})} className="w-full p-2 border rounded-md" required />
                    </div>
                     <div>
                        <label>Client Role</label>
                        <input type="text" value={current?.clientRole || ''} onChange={e => setCurrent({...current, clientRole: e.target.value})} className="w-full p-2 border rounded-md" required />
                    </div>
                    <div>
                        <label>Client Image URL</label>
                        <input type="text" value={current?.clientImage || ''} onChange={e => setCurrent({...current, clientImage: e.target.value})} className="w-full p-2 border rounded-md" required />
                    </div>
                    <div>
                        <label>Rating (1-5)</label>
                        <input type="number" min="1" max="5" value={current?.rating ?? ''} onChange={e => setCurrent({...current, rating: parseInt(e.target.value, 10) || 5})} className="w-full p-2 border rounded-md" required />
                    </div>
                    <button type="submit" disabled={isSaving} className="w-full bg-secondary text-white py-3 rounded-md font-bold mt-4 disabled:bg-gray-400">
                        {isSaving ? 'Saving...' : 'Save'}
                    </button>
                </form>
            </Modal>
        </div>
    );
};

// Sub-component for managing Contact Info
const ManageContactInfo: React.FC = () => {
    const { contactInfo, setContactInfo } = useData();
    const [formData, setFormData] = useState<ContactInfo>(contactInfo);
    const [isSaving, setIsSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        setFormData(contactInfo);
    }, [contactInfo]);
    
    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setSaved(false);
        try {
            const { id, ...updateData } = formData;
            const { data, error } = await supabase.from('contact_info').update(updateData).eq('id', id).select().single();
            if (error) throw error;
            setContactInfo(data);
            setSaved(true);
            setTimeout(() => setSaved(false), 2000);
        } catch (error) {
            const errorMessage = (error && typeof error === 'object' && 'message' in error) ? String(error.message) : JSON.stringify(error);
            console.error('Error saving contact info:', error);
            alert(`Failed to save contact info. Error: ${errorMessage}`);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div>
            <h3 className="text-3xl font-bold text-primary mb-6">Contact Information</h3>
            <div className="bg-white p-8 rounded-lg shadow-md">
                <form onSubmit={handleSave} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Phone</label>
                        <input type="text" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full p-2 border rounded-md" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full p-2 border rounded-md" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Address</label>
                        <input type="text" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="w-full p-2 border rounded-md" />
                    </div>
                    <div className="flex justify-end items-center pt-4">
                        {saved && <span className="text-green-600 mr-4 font-semibold">Saved successfully!</span>}
                        <button type="submit" disabled={isSaving} className="bg-secondary text-white py-2 px-6 rounded-md font-bold hover:bg-opacity-90 disabled:bg-gray-400">
                            {isSaving ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};


const AdminPanel: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const { categories, setCategories, services, setServices, benefits, setBenefits } = useData();
  const [activeTab, setActiveTab] = useState('Overview');
  const { navigate } = useRouter();
  
  const tabs = ['Overview', 'Developers', 'Properties', 'Testimonials', 'Contact Info', 'Categories', 'Services', 'Benefits'];

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('#/admin');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

    const categoryFields: FormField[] = [ { name: 'name', label: 'Category Name', type: 'text', required: true }, { name: 'icon', label: 'Icon', type: 'icon-select', required: true } ];
    const serviceFields: FormField[] = [ { name: 'title', label: 'Service Title', type: 'text', required: true }, { name: 'description', label: 'Description', type: 'textarea', required: true }, { name: 'icon', label: 'Icon', type: 'icon-select', required: true } ];
    const benefitFields: FormField[] = [ { name: 'title', label: 'Benefit Title', type: 'text', required: true }, { name: 'description', label: 'Description', type: 'textarea', required: true }, { name: 'icon', label: 'Icon', type: 'icon-select', required: true } ];
  
    const createSaveHandler = (tableName: string, setItems: React.Dispatch<React.SetStateAction<any[]>>) => async (item: any) => {
        const { id, ...updateData } = item;
        if (id) { // Update
            const { data, error } = await supabase.from(tableName).update(updateData).eq('id', id).select().single();
            if (error) throw error;
            setItems(prev => prev.map(i => i.id === data.id ? data : i));
        } else { // Insert
            const { data, error } = await supabase.from(tableName).insert(updateData).select().single();
            if (error) throw error;
            setItems(prev => [...prev, data]);
        }
    };

    const createDeleteHandler = (tableName: string, setItems: React.Dispatch<React.SetStateAction<any[]>>) => async (id: number) => {
        const { error } = await supabase.from(tableName).delete().eq('id', id);
        if (error) throw error;
        setItems(prev => prev.filter(i => i.id !== id));
    };

    const renderContent = () => {
      switch(activeTab) {
          case 'Overview': return <DashboardOverview />;
          case 'Developers': return <ManageDevelopers />;
          case 'Properties': return <ManageProperties />;
          case 'Testimonials': return <ManageTestimonials />;
          case 'Contact Info': return <ManageContactInfo />;
          case 'Categories': return <ManageSection title="Categories" items={categories} onSave={createSaveHandler('categories', setCategories)} onDelete={createDeleteHandler('categories', setCategories)} formFields={categoryFields} noun="Category" displayColumns={[{header: 'Icon', accessor: item => <Icon name={item.icon} className="w-8 h-8 text-primary"/>}, {header: 'Name', accessor: item => item.name}]}/>;
          case 'Services': return <ManageSection title="Services" items={services} onSave={createSaveHandler('services', setServices)} onDelete={createDeleteHandler('services', setServices)} formFields={serviceFields} noun="Service" displayColumns={[{header: 'Icon', accessor: item => <Icon name={item.icon} className="w-8 h-8 text-secondary"/>}, {header: 'Title', accessor: item => item.title}, {header: 'Description', accessor: item => item.description}]}/>;
          case 'Benefits': return <ManageSection title="Benefits" items={benefits} onSave={createSaveHandler('benefits', setBenefits)} onDelete={createDeleteHandler('benefits', setBenefits)} formFields={benefitFields} noun="Benefit" displayColumns={[{header: 'Icon', accessor: item => <Icon name={item.icon} className="w-8 h-8 text-secondary"/>}, {header: 'Title', accessor: item => item.title}, {header: 'Description', accessor: item => item.description}]}/>;
          default: return null;
      }
  };

  return (
    <div className="min-h-screen bg-light-gray font-sans">
      <header className="bg-primary text-white p-4 shadow-md sticky top-0 z-40">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">iWantPH Admin Panel</h1>
          <div>
            <a href="#/" onClick={(e) => { e.preventDefault(); navigate('#/'); }} className="font-semibold text-white hover:text-secondary mr-6">View Site</a>
            <button onClick={logout} className="bg-secondary text-white px-5 py-2 rounded-md font-semibold hover:bg-opacity-90">
              Logout
            </button>
          </div>
        </div>
      </header>
      
      <div className="container mx-auto p-8 flex">
        <aside className="w-1/5 pr-8">
            <nav className="sticky top-24">
                 <ul className="space-y-2">
                    {tabs.map(tab => (
                        <li key={tab}>
                            <button 
                                onClick={() => setActiveTab(tab)}
                                className={`w-full text-left px-4 py-3 rounded-md font-semibold transition-colors ${activeTab === tab ? 'bg-secondary text-white' : 'text-primary hover:bg-gray-200'}`}
                            >
                                {tab}
                            </button>
                        </li>
                    ))}
                 </ul>
            </nav>
        </aside>
        
        <main className="w-4/5">
            {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;

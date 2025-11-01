import React from 'react';
import { useData } from '../context/DataContext';
import { useRouter } from '../context/RouterContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { MapPinIcon } from '../constants';

const PropertyDetailPage: React.FC<{ propertyId: string }> = ({ propertyId }) => {
    const { properties, developers } = useData();
    const { navigate } = useRouter();
    
    const property = properties.find(p => p.id === parseInt(propertyId));
    const developer = property ? developers.find(d => d.id === property.developerId) : null;

    if (!property) {
        return (
            <div className="bg-light-gray font-sans">
                <Header />
                <main className="container mx-auto px-6 py-20 text-center min-h-screen">
                    <h1 className="text-4xl font-bold text-primary">Property Not Found</h1>
                    <p className="text-gray-600 mt-4">The property you are looking for does not exist.</p>
                    <button onClick={() => navigate('#/')} className="mt-8 bg-secondary text-white px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-all">
                        Back to Home
                    </button>
                </main>
                <Footer />
            </div>
        );
    }
    
    return (
        <div className="bg-light-gray font-sans">
            <Header />
            <main className="container mx-auto px-6 py-12">
                <div className="bg-white p-8 rounded-lg shadow-xl max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                        {/* Image Gallery */}
                        <div className="lg:col-span-3">
                            <img src={property.imageUrl} alt={property.title} className="w-full h-auto object-cover rounded-lg shadow-md" />
                        </div>

                        {/* Property Details */}
                        <div className="lg:col-span-2 flex flex-col">
                            <div className="flex justify-between items-start">
                                <span className={`px-3 py-1 text-sm font-semibold rounded-full text-white ${property.listingType === 'For Sale' ? 'bg-green-500' : 'bg-blue-500'}`}>
                                    {property.listingType}
                                </span>
                                <span className={`px-3 py-1 text-sm font-semibold rounded-full text-white ${property.status === 'Ready for Occupancy' ? 'bg-secondary' : 'bg-gray-500'}`}>
                                    {property.status}
                                </span>
                            </div>

                            <h1 className="text-4xl font-extrabold text-primary mt-4">{property.title}</h1>
                            <div className="flex items-center text-gray-600 my-4">
                                <MapPinIcon className="w-6 h-6 mr-2 text-gray-400" />
                                <span className="text-lg">{property.location}</span>
                            </div>

                            <p className="text-5xl font-extrabold text-primary mb-6">
                                ₱{property.price.toLocaleString()}
                                {property.listingType === 'For Rent' && <span className="text-xl font-normal text-gray-500"> / month</span>}
                            </p>
                            
                            <div className="grid grid-cols-3 gap-4 text-center border-t border-b py-4 my-6">
                                <div>
                                    <p className="font-bold text-xl text-primary">{property.bedrooms}</p>
                                    <p className="text-sm text-gray-500">Bedrooms</p>
                                </div>
                                <div>
                                    <p className="font-bold text-xl text-primary">{property.bathrooms}</p>
                                    <p className="text-sm text-gray-500">Bathrooms</p>
                                </div>
                                <div>
                                    <p className="font-bold text-xl text-primary">{property.sqm}</p>
                                    <p className="text-sm text-gray-500">sqm</p>
                                </div>
                            </div>

                            <h3 className="text-xl font-bold text-primary mb-2">Description</h3>
                            <p className="text-gray-700 mb-6 flex-grow">{property.description || 'No description available.'}</p>
                            
                            {developer && (
                                <div className="bg-gray-100 p-4 rounded-lg flex items-center space-x-4 mt-auto">
                                    <img src={developer.logoUrl} alt={developer.name} className="h-16 w-auto bg-white p-2 rounded-md"/>
                                    <div>
                                        <p className="text-sm text-gray-500">Developed by</p>
                                        <p className="font-bold text-lg text-primary">{developer.name}</p>
                                    </div>
                                </div>
                            )}

                            <button className="mt-8 w-full bg-secondary text-white py-4 rounded-lg font-bold text-lg hover:bg-opacity-90 transition-transform transform hover:scale-105">
                                Inquire About This Property
                            </button>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default PropertyDetailPage;

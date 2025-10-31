
import React, { useState, useMemo } from 'react';
import { useData } from '../context/DataContext';

const DeveloperProjects: React.FC = () => {
  const { developers } = useData();
  const developersWithProjects = useMemo(() => developers.filter(d => d.projects && d.projects.length > 0), [developers]);
  
  const [activeTab, setActiveTab] = useState(developersWithProjects[0]?.id || 0);

  const activeDeveloper = developersWithProjects.find(dev => dev.id === activeTab);

  return (
    <section id="projects" className="py-20 bg-light-gray">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">Developer Projects Showcase</h2>
          <p className="text-gray-600 mt-2">Explore flagship projects from the industry's best.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-8 border-b-2 border-gray-200">
          {developersWithProjects.map(dev => (
            <button
              key={dev.id}
              onClick={() => setActiveTab(dev.id)}
              className={`px-6 py-3 font-semibold text-lg transition-colors duration-300 border-b-4 ${activeTab === dev.id ? 'border-secondary text-primary' : 'border-transparent text-gray-500 hover:text-primary'}`}
            >
              {dev.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {activeDeveloper && activeDeveloper.projects.map(project => (
            <div key={project.id} className="bg-white rounded-lg shadow-md overflow-hidden group">
              <img src={project.imageUrl} alt={project.name} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="p-4">
                <h3 className="font-bold text-primary text-lg">{project.name}</h3>
                <p className="text-gray-500">{project.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DeveloperProjects;

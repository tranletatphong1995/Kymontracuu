import React, { useState } from 'react';
import Lookup from './components/Lookup';
import DataEntry from './components/DataEntry';
import DataManagement from './components/DataManagement';
import { FengShuiData, Category } from './types';
import { Compass } from 'lucide-react';

const initialData: Record<Category, FengShuiData[]> = {
  CửuTinh: [],
  BátMôn: [],
  BátThần: [],
  CáchCục: [],
};

function App() {
  const [data, setData] = useState(initialData);
  const [activeTab, setActiveTab] = useState<'lookup' | 'dataEntry' | 'dataManagement'>('lookup');

  const handleSave = (category: Category, newData: FengShuiData) => {
    setData((prevData) => ({
      ...prevData,
      [category]: [...prevData[category], newData],
    }));
  };

  const handleEdit = (category: Category, id: string, updatedData: FengShuiData) => {
    setData((prevData) => ({
      ...prevData,
      [category]: prevData[category].map((item) =>
        item.id === id ? { ...item, ...updatedData } : item
      ),
    }));
  };

  const handleDelete = (category: Category, id: string) => {
    setData((prevData) => ({
      ...prevData,
      [category]: prevData[category].filter((item) => item.id !== id),
    }));
  };

  return (
    <div className="min-h-screen bg-amber-50">
      <header className="bg-amber-700 text-white p-4">
        <div className="container mx-auto flex items-center">
          <Compass className="mr-2" size={24} />
          <h1 className="text-2xl font-bold">Hệ thống Tham khảo Phong thủy</h1>
        </div>
      </header>
      <nav className="bg-amber-600 text-white">
        <div className="container mx-auto flex">
          <button
            className={`px-4 py-2 ${activeTab === 'lookup' ? 'bg-amber-800' : ''}`}
            onClick={() => setActiveTab('lookup')}
          >
            Tra cứu
          </button>
          <button
            className={`px-4 py-2 ${activeTab === 'dataEntry' ? 'bg-amber-800' : ''}`}
            onClick={() => setActiveTab('dataEntry')}
          >
            Nhập dữ liệu
          </button>
          <button
            className={`px-4 py-2 ${activeTab === 'dataManagement' ? 'bg-amber-800' : ''}`}
            onClick={() => setActiveTab('dataManagement')}
          >
            Quản lý dữ liệu
          </button>
        </div>
      </nav>
      <main className="container mx-auto mt-8">
        {activeTab === 'lookup' && <Lookup data={data} />}
        {activeTab === 'dataEntry' && <DataEntry onSave={handleSave} />}
        {activeTab === 'dataManagement' && (
          <DataManagement data={data} onEdit={handleEdit} onDelete={handleDelete} />
        )}
      </main>
    </div>
  );
}

export default App;
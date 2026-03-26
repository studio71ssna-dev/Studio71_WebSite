import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Invoice() {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        // Fetch the invoice data from our backend
        fetch(`http://localhost:3000/api/invoice/${id}`)
            .then(res => res.ok ? res.json() : Promise.reject('Invoice not found'))
            .then(data => setOrder(data))
            .catch(err => setError(err));
    }, [id]);

    if (error) return <div className="text-white text-center mt-20 text-2xl">{error}</div>;
    if (!order) return <div className="text-white text-center mt-20 text-2xl animate-pulse">Retrieving Data...</div>;

    const invoiceDate = new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const shortId = order._id.slice(-6).toUpperCase();

    return (
        <div className="bg-gray-100 p-10 min-h-screen text-black">
            <div className="max-w-4xl mx-auto mb-6 no-print flex justify-end">
                <button onClick={() => window.print()} className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700 transition-colors">
                    Download PDF / Print
                </button>
            </div>

            <div className="relative max-w-4xl mx-auto bg-white p-16 shadow-lg min-h-[1100px] overflow-hidden">
                <div className="absolute top-[20%] left-[10%] w-[80%] opacity-5 -z-10 -rotate-12 text-9xl">🧊</div>

                <div className="flex justify-between items-start border-b-2 border-blue-500 pb-4 mb-8">
                    <h1 className="text-4xl font-light text-blue-900 tracking-widest">INVOICE</h1>
                </div>

                <div className="flex justify-between mb-12 text-sm">
                    <div>
                        <p className="font-bold uppercase">From:</p>
                        <p>Ahmed Swaroar</p>
                        <p>STUDIO 71</p>
                        <p>+8801521433946</p>
                    </div>
                    <div className="text-right">
                        <p className="font-bold uppercase">Bill To:</p>
                        <p className="font-medium text-lg">{order.clientName}</p>
                        <p className="text-gray-600">{order.email}</p>
                    </div>
                </div>

                <div className="mb-8 text-sm">
                    <p><strong>Invoice #:</strong> S71-{shortId}</p>
                    <p><strong>Date:</strong> {invoiceDate}</p>
                </div>

                <table className="w-full text-left border-collapse mb-8">
                    <thead>
                        <tr className="bg-blue-600 text-white">
                            <th className="p-3">Description</th>
                            <th className="p-3 text-right">Amount</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        <tr className="border-b">
                            <td className="p-3">{order.description}</td>
                            <td className="p-3 text-right">1000 BDT</td>
                        </tr>
                        <tr className="font-bold bg-gray-50">
                            <td className="p-3">TOTAL</td>
                            <td className="p-3 text-right text-blue-900">1000 BDT</td>
                        </tr>
                    </tbody>
                </table>

                <div className="mt-20 flex justify-between items-end">
                    <div className="text-xs space-y-1">
                        <p className="font-bold mb-2">PAYMENT DETAILS:</p>
                        <p>Bkash: 01521433946</p>
                        <p>Nagad: 01521433946</p>
                        <p className="mt-4 italic text-gray-500 pt-4 border-t border-gray-200">Please include Invoice # S71-{shortId} in reference.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
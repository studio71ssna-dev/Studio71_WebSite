import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Invoice() {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch(`https://studio71-backend.onrender.com/api/invoice/${id}`)
            .then(res => res.ok ? res.json() : Promise.reject('Invoice not found'))
            .then(json => {
                if (json.success) setOrder(json.data);
                else setError(json.message);
            })
            .catch(err => setError(err));
    }, [id]);

    if (error) return <div className="text-white text-center mt-20 text-2xl font-mono">{error}</div>;
    if (!order) return <div className="text-[#00ff9d] text-center mt-20 text-xl font-mono animate-pulse tracking-widest uppercase">Retrieving Data...</div>;

    const invoiceDate = new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const shortId = order._id.slice(-6).toUpperCase();

    return (
        <div className="bg-gray-100 p-4 md:p-10 min-h-screen text-black font-sans">
            <div className="max-w-4xl mx-auto mb-6 no-print flex justify-end">
                <button onClick={() => window.print()} className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700 transition-colors uppercase text-sm tracking-wider font-bold">
                    Download PDF / Print
                </button>
            </div>

            <div className="relative w-full max-w-4xl mx-auto bg-white p-6 md:p-16 shadow-2xl min-h-auto md:min-h-[1100px] overflow-hidden">
                <div className="absolute top-[20%] left-[10%] w-[80%] opacity-5 -z-10 -rotate-12 text-7xl md:text-9xl pointer-events-none">🧊</div>

                <div className="flex flex-col md:flex-row justify-between items-start border-b-2 border-blue-500 pb-4 mb-10 gap-4">
                    <h1 className="text-4xl md:text-5xl font-light text-blue-900 tracking-[0.2em]">INVOICE</h1>
                </div>

                <div className="flex flex-col md:flex-row justify-between mb-16 text-sm gap-8">
                    <div className="space-y-1">
                        <p className="font-black text-gray-500 uppercase tracking-wider mb-2 text-xs">From:</p>
                        <p className="font-bold text-lg">Ahmed Swaroar</p>
                        <p className="text-blue-900 font-bold tracking-widest">STUDIO 71</p>
                        <p className="text-gray-600">+8801521433946</p>
                    </div>
                    <div className="md:text-right space-y-1">
                        <p className="font-black text-gray-500 uppercase tracking-wider mb-2 text-xs">Bill To:</p>
                        <p className="font-bold text-lg">{order.clientName}</p>
                        <p className="text-gray-600">{order.email}</p>
                    </div>
                </div>

                <div className="mb-12 flex flex-col sm:flex-row justify-between bg-gray-50 p-6 rounded-lg border border-gray-100 gap-4">
                    <div>
                        <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Invoice Number</p>
                        <p className="font-mono text-lg text-blue-900">S71-{shortId}</p>
                    </div>
                    <div className="sm:text-right">
                        <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Date Issued</p>
                        <p className="text-lg">{invoiceDate}</p>
                    </div>
                </div>

                <div className="overflow-x-auto mb-12">
                    <table className="w-full text-left border-collapse min-w-[500px]">
                        <thead>
                            <tr className="bg-blue-600 text-white uppercase text-xs tracking-wider">
                                <th className="p-4 rounded-tl-lg">Description</th>
                                <th className="p-4 text-right rounded-tr-lg">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-800">
                            <tr className="border-b border-gray-200">
                                <td className="p-4 py-6">{order.description}</td>
                                <td className="p-4 py-6 text-right font-mono">{order.amount} BDT</td>
                            </tr>
                            <tr className="bg-gray-50">
                                <td className="p-4 py-6 font-black text-right text-gray-500 uppercase tracking-wider text-sm">Total Due</td>
                                <td className="p-4 py-6 text-right font-black text-2xl text-blue-900 font-mono border-t-2 border-blue-200">{order.amount} BDT</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="mt-16 md:mt-32 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
                    <div className="text-sm space-y-2">
                        <p className="font-black text-blue-900 uppercase tracking-wider mb-4 border-b border-gray-200 pb-2 inline-block">Payment Details</p>
                        <p className="flex justify-between w-48"><span className="text-gray-500">Bkash:</span> <span className="font-mono font-bold">01521433946</span></p>
                        <p className="flex justify-between w-48"><span className="text-gray-500">Nagad:</span> <span className="font-mono font-bold">01521433946</span></p>
                        <p className="mt-8 italic text-xs text-gray-400">Please include Invoice # S71-{shortId} in the payment reference.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
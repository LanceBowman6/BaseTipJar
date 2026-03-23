'use client';

import { useState, useEffect } from 'react';
import { useAccount, useWriteContract, useReadContract } from 'wagmi';
import { parseEther, formatEther } from 'viem';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { trackTransaction } from '@/utils/track';

const CONTRACT_ADDRESS = '0xd421c2aab26ef7a3324b99bee39fd84b3195fd09' as const;
const CONTRACT_ABI = [
  {
    inputs: [{ name: 'message', type: 'string' }],
    name: 'tip',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'withdrawAll',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getTipsCount',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ name: '', type: 'uint256' }],
    name: 'tips',
    outputs: [
      { name: 'from', type: 'address' },
      { name: 'amount', type: 'uint256' },
      { name: 'message', type: 'string' },
      { name: 'timestamp', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: 'from', type: 'address' },
      { indexed: false, name: 'amount', type: 'uint256' },
      { indexed: false, name: 'message', type: 'string' },
    ],
    name: 'Tipped',
    type: 'event',
  },
] as const;

export default function Home() {
  const { address } = useAccount();
  const [tipAmount, setTipAmount] = useState('0.001');
  const [message, setMessage] = useState('');
  const [recentTips, setRecentTips] = useState<any[]>([]);

  const { writeContract, data: hash, isPending } = useWriteContract();

  const { data: tipsCount } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getTipsCount',
  });

  const { data: owner } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'owner',
  });

  const isOwner = address && owner && address.toLowerCase() === owner.toLowerCase();

  // Load recent tips
  useEffect(() => {
    if (!tipsCount) return;
    const count = Number(tipsCount);
    if (count === 0) return;

    const loadTips = async () => {
      const tips = [];
      const start = Math.max(0, count - 10);
      for (let i = count - 1; i >= start; i--) {
        // In production, you'd batch these calls
        tips.push({ index: i });
      }
      setRecentTips(tips.reverse());
    };

    loadTips();
  }, [tipsCount]);

  // Track transaction after success
  useEffect(() => {
    if (hash && address) {
      trackTransaction('app-001', 'BaseTipJar', address, hash);
    }
  }, [hash, address]);

  const handleSendTip = async () => {
    if (!tipAmount || parseFloat(tipAmount) <= 0) {
      alert('Please enter a valid tip amount');
      return;
    }

    try {
      await writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'tip',
        args: [message || 'Anonymous tip'],
        value: parseEther(tipAmount),
      });
    } catch (error) {
      console.error('Error sending tip:', error);
    }
  };

  const handleWithdraw = async () => {
    try {
      await writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'withdrawAll',
      });
    } catch (error) {
      console.error('Error withdrawing:', error);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-4">
      <div className="max-w-md mx-auto pt-8">
        <div className="bg-white rounded-2xl shadow-2xl p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">🎁 BaseTipJar</h1>
            <ConnectButton />
          </div>

          {address ? (
            <div className="space-y-6">
              {/* Send Tip Form */}
              <div className="bg-blue-50 rounded-xl p-4">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Send a Tip</h2>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Amount (ETH)
                    </label>
                    <input
                      type="number"
                      step="0.001"
                      value={tipAmount}
                      onChange={(e) => setTipAmount(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800"
                      placeholder="0.001"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Message (optional)
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800"
                      placeholder="Leave a message..."
                      rows={3}
                    />
                  </div>
                  <button
                    onClick={handleSendTip}
                    disabled={isPending}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
                  >
                    {isPending ? 'Sending...' : '💸 Send Tip'}
                  </button>
                </div>
              </div>

              {/* Stats */}
              <div className="bg-purple-50 rounded-xl p-4">
                <h3 className="text-lg font-semibold mb-2 text-gray-800">📊 Stats</h3>
                <p className="text-gray-700">Total Tips: {tipsCount?.toString() || '0'}</p>
                {isOwner && (
                  <button
                    onClick={handleWithdraw}
                    disabled={isPending}
                    className="mt-3 w-full bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700 disabled:bg-gray-400 transition"
                  >
                    Withdraw All
                  </button>
                )}
              </div>

              {/* Recent Tips */}
              {recentTips.length > 0 && (
                <div className="bg-green-50 rounded-xl p-4">
                  <h3 className="text-lg font-semibold mb-3 text-gray-800">💬 Recent Tips</h3>
                  <div className="space-y-2">
                    {recentTips.map((tip) => (
                      <div key={tip.index} className="bg-white p-3 rounded-lg shadow-sm">
                        <p className="text-sm text-gray-600">Tip #{tip.index + 1}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {hash && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
                  <p className="font-semibold">Transaction sent!</p>
                  <a
                    href={`https://basescan.org/tx/${hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm underline break-all"
                  >
                    View on BaseScan
                  </a>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">Connect your wallet to send tips</p>
              <div className="text-4xl mb-4">👛</div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center text-white text-sm">
          <p>Built on Base • Powered by Builder Code</p>
          <p className="text-xs opacity-75 mt-1">Contract: {CONTRACT_ADDRESS}</p>
        </div>
      </div>
    </main>
  );
}

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

const API_URL = 'https://a-world-away-hunting-for-exoplanets-with.onrender.com'; // Or your backend URL

interface UserScore {
  username: string;
  score: number;
}

export function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<UserScore[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get(`${API_URL}/leaderboard`);
        setLeaderboard(response.data);
      } catch (err) {
        setError('Failed to load leaderboard.');
        console.error(err);
      }
    };
    fetchLeaderboard();
  }, []);

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Top Planet Hunters</CardTitle>
      </CardHeader>
      <CardContent>
        {error && <p className="text-red-500">{error}</p>}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Rank</TableHead>
              <TableHead>Hunter</TableHead>
              <TableHead className="text-right">Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leaderboard.map((user, index) => (
              <TableRow key={user.username}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell className="text-right">{user.score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

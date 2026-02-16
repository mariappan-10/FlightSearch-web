const API_BASE = '/api';

export async function getOrigins(): Promise<string[]> {
  const res = await fetch(`${API_BASE}/airports/origins`);
  if (!res.ok) throw new Error('Failed to load origins');
  return res.json();
}

export async function getDestinations(origin: string): Promise<string[]> {
  const res = await fetch(`${API_BASE}/airports/destinations/${encodeURIComponent(origin)}`);
  if (res.status === 404) throw new Error('Origin not found');
  if (res.status === 400) throw new Error('Invalid origin');
  if (!res.ok) throw new Error('Failed to load destinations');
  return res.json();
}

export interface Flight {
  id: string;
  origin: string;
  destination: string;
  departure: string;
  returnAt: string | null;
  carrier: string;
  price: number;
}

export async function searchFlights(params: {
  origin?: string;
  destination?: string;
  departureDate?: string;
}): Promise<Flight[]> {
  const sp = new URLSearchParams();
  if (params.origin) sp.set('origin', params.origin);
  if (params.destination) sp.set('destination', params.destination);
  if (params.departureDate) sp.set('departureDate', params.departureDate);
  const qs = sp.toString();
  const url = `${API_BASE}/flights${qs ? `?${qs}` : ''}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to search flights');
  return res.json();
}

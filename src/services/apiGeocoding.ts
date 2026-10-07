interface GeocodingParams {
  latitude: number;
  longitude: number;
}

interface AddressData {
  locality: string;
  city: string;
  postcode: string;
  countryName: string;
  countryCode?: string;
  principalSubdivision?: string;
}

export async function getAddress({
  latitude,
  longitude,
}: GeocodingParams): Promise<AddressData> {
  const res = await fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}`,
  );
  if (!res.ok) throw Error("Failed getting address");

  const data = await res.json();
  return data;
}

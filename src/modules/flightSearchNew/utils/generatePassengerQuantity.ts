interface PassengerQuantities {
  [code: string]: number;
}

interface PassengerTypeQuantity {
  Code: string;
  Quantity: number;
}

export function generatePassengerTypeQuantity(
  passengerQuantities: PassengerQuantities
): PassengerTypeQuantity[] {
  const passengerTypeQuantityArray: PassengerTypeQuantity[] = [];
  for (const code in passengerQuantities) {
    const quantity = passengerQuantities[code];
    if (quantity > 0) {
      passengerTypeQuantityArray.push({
        Code: code,
        Quantity: quantity,
      });
    }
  }
  return passengerTypeQuantityArray;
}

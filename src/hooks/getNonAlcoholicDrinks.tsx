export async function getNonAlcoholicDrinks(url: string): Promise<IDrinks[]> {
  try {
    const response = await fetch(url);
    const data: IDrinksApiResponse = await response.json();

    if (data.drinks && data.drinks.length > 0) {
      return data.drinks;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching non-alcoholic drinks:", error);
    return [];
  }
}

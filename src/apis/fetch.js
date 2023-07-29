

export async function fetchData(url) {
    try {
      const resp = await fetch(url);
      if (!resp.ok) {
        throw new Error('Network response was not ok');
      }
      return await resp.json();
    } catch (err) {
      console.error('Error fetching data:', err);
      return null;
    }
}

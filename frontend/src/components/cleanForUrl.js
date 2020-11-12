const cleanForUrl = (c) => c.toLowerCase().replaceAll(/ +/g, '-');
export default cleanForUrl;

export const sliceWords = (content, amount) => {
  // Remove HTML tags using a temporary div element
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = content;
  const text = tempDiv.textContent || tempDiv.innerText || "";

  // Split the text into words
  const words = text.trim().split(/\s+/);

  // Slice the first 100 words
  const slicedContent = words.slice(0, amount).join(" ");

  return slicedContent;
};

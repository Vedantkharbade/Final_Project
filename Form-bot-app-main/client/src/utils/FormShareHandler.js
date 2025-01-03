export const handleShare = (formId, setLinkCopied) => {
    try {
      const formLink = `${window.location.origin}/forms/public/${formId}`;
      navigator.clipboard.writeText(formLink)
        .then(() => {
          setLinkCopied(true);
          setTimeout(() => setLinkCopied(false), 2000);
        })
        .catch((err) => console.error('Failed to copy link:', err));
    } catch (error) {
      console.error('Error sharing form:', error);
      alert('Failed to share form. Please try again.');
    }
  };
  
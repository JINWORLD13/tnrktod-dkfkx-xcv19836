function isComDomain(email) {
  if (!email) return false;
  return email?.endsWith('.com') || email?.includes('@');
}
export default isComDomain;

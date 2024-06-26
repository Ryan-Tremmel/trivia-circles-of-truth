export default function Copyright() {
  const year = new Date().getFullYear();
  return <p className="copyright">&copy; {year} Ryan Tremmel</p>;
}

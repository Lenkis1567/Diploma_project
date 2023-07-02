import Urls from './Urls'

function NavbarLogout (props) {
    async function logoutUserFunction(e){
        e.preventDefault();
        let tempToken=localStorage.getItem("token")
        console.log('***** In logout*****  User logout', tempToken);

        let res = await requestPOST(Urls.logoutUser, {}, tempToken);
        console.log(typeof(res), res);

        // divUser.textContent = 'Undefined';
        // divToken.textContent = '';

        return (
            <a href='#' onclick='logoutUserFunction(event)'> Logout </a>
            )

}}

export default NavbarLogout
import React, {useState} from 'react';
import Logo from './component/global/Logo';
import Footage from './component/structure/Footage';
import TopButtons from './component/structure/TopButtons';
import TopNav from './component/structure/TopNav';

function Header()
{
    const [show, setShow] = useState({navigation: true, footage: true});

    return (
        <header className={'Header'}>
            <Logo />
            <TopButtons onNavigationClick=
                            {
                                () => {setShow({navigation: !show.navigation, footage: show.footage})}
                            }
                        onFootageClick=
                            {
                                () => {setShow({navigation: show.navigation, footage: !show.footage})}
                            }
                        show={show}/>
            {show.navigation && <TopNav />}
            {show.footage && <Footage />}
        </header>
    );
}

export default Header;
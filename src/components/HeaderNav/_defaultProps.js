import logo1 from '../../components/background/1.png';
import logo2 from '../../components/background/2.png';
import logo3 from '../../components/background/3.png';
import logo4 from '../../components/background/4.png';
import logo5 from '../../components/background/5.png';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  route: {
    path: '/',
    routes: [
      {
        path: '/1',
        name: <span style={{ color: 'white', }}>员工信息录入</span>,
        icon: <img src={logo1} style={{ width: '20px', height: '20px' }} alt="员工信息录入图标" />, 
      },
      {
        path: '/2',
        name: <span style={{ color: 'white', }}>员工购买保险</span>,
        icon: <img src={logo2} style={{ width: '20px', height: '20px' }} alt="员工购买保险" />, 
      },
      {
        path: '/3',
        name: <span style={{ color: 'white', }}>其他功能1</span>,
        icon: <img src={logo3} style={{ width: '20px', height: '20px' }} alt="其他功能1" />, 
      },
      {
        path: '/4',
        name: <span style={{ color: 'white', }}>其他功能2</span>,
        icon: <img src={logo4} style={{ width: '20px', height: '20px' }} alt="其他功能2" />, 
      },
      {
        path: '/5',
        name: <span style={{ color: 'white', }}>其他功能3</span>,
        icon: <img src={logo5} style={{ width: '20px', height: '20px' }} alt="其他功能3" />, 
      },
      
      
    ],
  },
  location: {
    pathname: '/',
  },
  
};
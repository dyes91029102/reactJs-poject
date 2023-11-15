import React, { FC } from 'react';
import { Link, NavLink } from 'react-router-dom';
import CustomNavbar from '../../components/Navbar/Navbar';
import HomeCard from '../../components/HomeCard/HomeCard';


interface HomeProps { }

const Home: FC<HomeProps> = () => {

  const imgBaseUrl = '/assets/images/module-icon';
  const imgArr = [
    /* 組織溫室氣體 */
    {
      title: '組織溫室氣體',
      englishTitle: 'GHG Emission',
      router: 'greenhouse',
      colorIndex: 3,
      color: '249, 165, 23',
      opacity: 0.2,
      chOpacity: 0.65,
      img: `${imgBaseUrl}/greenhouse.svg`,
      loading: false
    },
    /* 產品碳足跡 */
    {
      title: '產品碳足跡',
      englishTitle: 'Carbon Footprint',
      router: 'carbon',
      colorIndex: 4,
      color: '94, 134, 254',
      opacity: 0.2,
      chOpacity: 0.6,
      img: `${imgBaseUrl}/carbon.svg`,
      loading: false
    },
  ];

   /**設定深淺 */
  const setOpacity = (item: any, opacity: number) =>{
    console.log(item);
    item.opacity = opacity;
  }

  
  /** 取得顏色 */
  const getColor = (item: any)=> {
    return `rgba(${item.color},${item.opacity})`
  }
  return (
    <div >
      {/* navbar */}
      <div>
        <CustomNavbar />
      </div>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 0',
        width: '100%'
      }}>
        <div className="row no-gutters w-100">
          {
            imgArr.map(item => {
              return (
                <HomeCard key={item.router} item={item}/>
              )
            })
          }

        </div>
      </div>

    </div>

  )
};

export default Home;

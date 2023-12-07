import React, { FC, memo, useContext, useMemo } from 'react';
import { Link, NavLink, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useUserInfoStore from '../../state/useUserInfoStore';
import Navbar from '../../components/layouts/Navbar';
import PureHomeCard from '../../components/home/PureHomeCard';


interface HomeProps { }

const Home: FC<HomeProps> = () => {
  const { t } = useTranslation();
  console.log('home')
  const { userInfo} = useUserInfoStore();
  const imgBaseUrl = '/assets/images/module-icon';
  const imgArr = [
    /* 組織溫室氣體 */
    {
      title: t("GREENHOUSE"),
      englishTitle: 'GHG Emission',
      router: 'greenhouse/list',
      colorIndex: 3,
      color: '249, 165, 23',
      opacity: 0.2,
      chOpacity: 0.65,
      img: `${imgBaseUrl}/greenhouse.svg`,
      loading: false
    },
    /* 產品碳足跡 */
    {
      title: t("CARBON"),
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


  return (
    <div >
      {/* navbar */}
      <div>
        <Navbar />
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
               <PureHomeCard key={item.router} item={item} />
              )
            })
          }

        </div>
      </div>

    </div>

  )
};

export default Home;

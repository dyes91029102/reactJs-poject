import React, { FC } from 'react';
import { Link } from 'react-router-dom';


interface HomeCardProps {
  item: any;
}

const PureHomeCard: FC<HomeCardProps> = React.memo((props) => {
  const { item } = props;
  /**設定深淺 */
  const setOpacity = (item: any, opacity: number) => {
    item.opacity = opacity;
  }


  /** 取得顏色 */
  const getColor = (item: any) => {
    return `rgba(${item.color},${item.opacity})`
  }
  return (
    <div className="col-xs-6 col-md-6"
      onMouseOver={() => setOpacity(item, item.chOpacity)}
      onMouseLeave={() => setOpacity(item, 0.2)}>
      <Link to={"/main/" + item.router}>
        <div
          className={`card-block`}
          style={{
            borderColor: getColor(item)
          }}>
          <div className="card-icon-box">
            <img style={{
              width: '80px'
            }} src={item.img} alt="" />
          </div>
          <div className="card-text">
            <div className="ch-name">
              {item.title}
            </div>
            <div className="en-name">
              {item.englishTitle}
            </div>
          </div>
          <div className="card-mask"
            style={{
              backgroundColor: getColor(item)
            }}>

          </div>
        </div>
      </Link>
    </div>
  )
});

export default PureHomeCard;

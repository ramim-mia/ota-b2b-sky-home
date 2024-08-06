import { Spin } from 'antd';
import loaderPlane from '../../../assets/images/loader-plane.png';
import earth from '../../../assets/images/earth.gif';

const Loading = () => {
  return (
    <div className='relative w-20 h-20 animate-spin'>
      <div className='absolute w-20 h-20 rounded-md bg-blue-500 animate-shape1'></div>
      <div className='absolute w-20 h-20 rounded-md bg-[#053969] animate-shape2'></div>
      <div className='absolute w-20 h-20 rounded-md bg-[#053969] animate-shape3'></div>
      <div className='absolute w-20 h-20 rounded-md bg-[#053969] animate-shape4'></div>
    </div>
  );
};

export const loadingIndicator = (
  <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center h-screen z-50'>
    <Loading />
  </div>
);

export default function LoadingIndicator() {
  return (
    <div
      className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center h-screen w-calc(100vw - 8%) z-50'
      id='loader'
    >
      <div className='loader' id='preloader'>
        <div className='preloader-wrap'>
          <div className='plane'>
            <img className='plane-img' src={loaderPlane} alt='' />
          </div>
          <div className='earth-wrapper'>
            <div
              className='earth'
              style={{
                backgroundImage: `url(${earth})`,
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

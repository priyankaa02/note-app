import React, {Component} from 'react';
import MobileStoreButton from 'react-mobile-store-button';
import Lottie from 'react-lottie';
import background from '../images/oodies-browserExt-bg-02.jpg'
import "./Frame.css"
import animationData from '../images/Break.json'
import oodies_logo from '../images/new-logo-pink.png'
const iOSUrl = 'https://testflight.apple.com/join/vn4hDw6q';
const androidUrl = 'https://play.google.com/store/apps/details?id=com.oneoneday.oodies';


class FrameTwo extends Component {

    render() {

      const defaultOptions = {
            loop: true,
            autoplay: true,
            animationData: animationData,
            rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice'
            }
        }

        return (
            <div className="container">
                <img className="background" src={background} alt="background"/>
                <img className="logo" src={oodies_logo} alt="oodies_logo"/>
                <div className="bottom">
                   <p className="by-black">Happily created by OneOneDay Co. Ltd</p>
                </div>
                <div className="left-bottom">
                   <p className="desc-black">Your attention is valuable,so don't give it away for free.Start exchanging your attention for rewards with Oodies.Join the Beta now on Android and IOS for extra rewards and big prizes!</p>
                </div>
                <div className="flex">
                    <div className="flex-child">
                      <MobileStoreButton
                          url={androidUrl}
                          width="80px"
                          height="40px"
                          store="android"
                          linkProps={{title: 'android Store Button'}}
                      />
                    </div>
                    <div className="flex-child">
                      <MobileStoreButton
                          url={iOSUrl}
                          width="80px"
                          height="40px"
                          store="ios"
                          linkProps={{title: 'iOS Store Button'}}
                      />
                    </div>
                </div>
                <div className="flex1">
                    <Lottie options={defaultOptions} />
                </div>
            </div>
        );
    }
}

export default FrameTwo;

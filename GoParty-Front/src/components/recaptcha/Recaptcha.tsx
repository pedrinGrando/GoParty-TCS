import ReCAPTCHA from "react-google-recaptcha";
import config from '../../../config.json';

export const Recaptcha: React.FC<{ onCaptchaChange: (captcha: boolean) => void }> = ({ onCaptchaChange }) => {

    const handleCaptchaChange = (value: any) => {
        const isCaptchaValid = value !== null;
        onCaptchaChange(isCaptchaValid);
    };

    return (
        <div className="flex justify-center items-center w-full p-4">
            <ReCAPTCHA
                sitekey={config.REACT_APP_SITE_KEY}
                onChange={handleCaptchaChange}
                size={"normal"}
            />
        </div>
    );
};

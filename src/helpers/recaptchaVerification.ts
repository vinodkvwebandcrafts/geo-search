import getGeneralData from "./getGeneralData";

interface RecaptchaResult {
    success: boolean;
    challenge_ts: string;
    hostname: string;
    score: number;
    action: string;
    "error-codes"?: string[];
}

interface RecaptchaResponse {
    success: boolean;
    message: string;
    score?: number;
    errors?: string[];
}

export default async function recaptchaVerification(token: string, threshold = 0.5): Promise<RecaptchaResponse> {
    if (!token) {
        return {
            success: false,
            message: "No reCAPTCHA token provided"
        };
    }

    const url = `https://www.google.com/recaptcha/api/siteverify`;
    const recaptcha_secret_key = await getGeneralData().then(data => data?.recaptcha_secret_key);

    if (!recaptcha_secret_key) {
        return {
            success: false,
            message: "reCAPTCHA secret key not configured"
        };
    }

    try {

        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams({
                secret: recaptcha_secret_key,
                response: token,
            })
        });

        const response = await res.json() as RecaptchaResult;
        
        if (response?.success) {
            if (response?.score >= threshold) {
                return {
                    success: true,
                    message: "reCAPTCHA v3 verified successfully",
                    score: response.score,
                };
            } else {
                return {
                    success: false,
                    message: `reCAPTCHA verification failed. Score: ${response.score} (Threshold: ${threshold})`,
                };
            }
        } else {
            return {
                success: false,
                message: "reCAPTCHA verification failed",
                errors: response["error-codes"],
            };
        }

    } catch (err) {
        strapi.log.error("reCAPTCHA validation error:", err);
        return {
            success: false,
            message: "reCAPTCHA verification failed due to an error",
        };
    }
}
import { Button } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";

function GoBackBtn() {
    const navigate = useNavigate();
    const handleReturn = () => navigate(-1);
    return (
        <Button
            startIcon={<ArrowBackIcon />}
            onClick={handleReturn}
        >
            Quay lại
        </Button>
    )
}

export default GoBackBtn;
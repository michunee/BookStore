import { Button } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function GoBackBtn() {
    return (
        <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => window.history.back()}
        >
            Quay lại
        </Button>
    )
}

export default GoBackBtn;
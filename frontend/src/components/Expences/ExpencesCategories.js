import FastfoodIcon from "@mui/icons-material/Fastfood";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import NightlifeIcon from "@mui/icons-material/Nightlife";
import PublicIcon from "@mui/icons-material/Public";
import HomeIcon from "@mui/icons-material/Home";
import DifferenceIcon from "@mui/icons-material/Difference";
import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import AttractionsIcon from "@mui/icons-material/Attractions";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";

export const categoriesList = [
  {
    id: "home",
    title: "Home",
    icon: <HomeIcon />,
    color: "#B09B58",
  },
  {
    id: "education",
    title: "Education",
    icon: <SchoolIcon />,
    color: "#466C94",
  },
  {
    id: "other",
    title: "Other",
    icon: <DifferenceIcon />,
    color: "#67696B",
  },
  {
    id: "food",
    title: "Food",
    icon: <FastfoodIcon />,
    color: "#FFA506",
  },
  {
    id: "travel",
    title: "Travelling",
    icon: <PublicIcon />,
    color: "#F864A2",
  },
  {
    id: "work",
    title: "Work",
    icon: <WorkIcon />,
    color: "#6E6D8C",
  },
  {
    id: "gifts",
    title: "Gifts",
    icon: <CardGiftcardIcon />,
    color: "#0CB471",
  },
  {
    id: "bills",
    title: "Bills",
    icon: <ReceiptLongIcon />,
    color: "#5DC3AD",
  },
  {
    id: "attractions",
    title: "Attractions",
    icon: <AttractionsIcon />,
    color: "#EE9D7D",
  },
  {
    id: "car",
    title: "Car",
    icon: <DirectionsCarFilledIcon />,
    color: "#50A8E7",
  },
  {
    id: "hobby",
    title: "Hobby",
    icon: <SportsSoccerIcon />,
    color: "#80CBC9",
  },
  {
    id: "groceries",
    title: "Groceries",
    icon: <ShoppingBagIcon />,
    color: "#D68140",
  },
  {
    id: "health",
    title: "Health",
    icon: <MedicalInformationIcon />,
    color: "#D86973",
  },
  {
    id: "clothes",
    title: "Clothes",
    icon: <CheckroomIcon />,
    color: "#FECD1B",
  },
  {
    id: "party",
    title: "Partying",
    icon: <NightlifeIcon />,
    color: "#7846CB",
  },
];

export const categoryCheck = (category) => {
  switch (category) {
    case "home":
      return categoriesList.find((itemCategory) => {
        return itemCategory.id === "home";
      });
      break;
    case "education":
      return categoriesList.find((itemCategory) => {
        return itemCategory.id === "education";
      });
      break;
    case "other":
      return categoriesList.find((itemCategory) => {
        return itemCategory.id === "other";
      });
      break;
    case "food":
      return categoriesList.find((itemCategory) => {
        return itemCategory.id === "food";
      });
      break;
    case "travel":
      return categoriesList.find((itemCategory) => {
        return itemCategory.id === "travel";
      });
      break;
    case "work":
      return categoriesList.find((itemCategory) => {
        return itemCategory.id === "work";
      });
      break;
    case "gifts":
      return categoriesList.find((itemCategory) => {
        return itemCategory.id === "gifts";
      });
      break;
    case "bills":
      return categoriesList.find((itemCategory) => {
        return itemCategory.id === "bills";
      });
      break;
    case "attractions":
      return categoriesList.find((itemCategory) => {
        return itemCategory.id === "attractions";
      });
      break;
    case "car":
      return categoriesList.find((itemCategory) => {
        return itemCategory.id === "car";
      });
      break;
    case "hobby":
      return categoriesList.find((itemCategory) => {
        return itemCategory.id === "hobby";
      });
      break;
    case "groceries":
      return categoriesList.find((itemCategory) => {
        return itemCategory.id === "groceries";
      });
      break;
    case "health":
      return categoriesList.find((itemCategory) => {
        return itemCategory.id === "health";
      });
      break;
    case "clothes":
      return categoriesList.find((itemCategory) => {
        return itemCategory.id === "clothes";
      });
      break;
    case "party":
      return categoriesList.find((itemCategory) => {
        return itemCategory.id === "party";
      });
      break;
  }
};

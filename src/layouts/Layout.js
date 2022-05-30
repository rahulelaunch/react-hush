import React, { useContext, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AuthSimpleLayout from './AuthSimpleLayout';
import is from 'is_js';
import MainLayout from './MainLayout';
import SettingsToggle from 'components/settings-panel/SettingsToggle';
import SettingsPanel from 'components/settings-panel/SettingsPanel';

import ErrorLayout from './ErrorLayout';
import Landing from 'components/pages/landing/Landing';
import { toast, ToastContainer } from 'react-toastify';
import { CloseButton } from 'components/common/Toast';


import Badges from 'components/doc-components/Badges';
import Breadcrumbs from 'components/doc-components/Breadcrumb';
import Buttons from 'components/doc-components/Buttons';
import Cards from 'components/doc-components/Cards';
import Dropdowns from 'components/doc-components/Dropdowns';
import ListGroups from 'components/doc-components/ListGroups';
import Modals from 'components/doc-components/Modals';
import Pagination from 'components/doc-components/Pagination';
import BasicProgressBar from 'components/doc-components/ProgressBar';
import Spinners from 'components/doc-components/Spinners';
import Toasts from 'components/doc-components/Toasts';
import Avatar from 'components/doc-components/Avatar';
import Image from 'components/doc-components/Image';
import Tooltips from 'components/doc-components/Tooltips';
import Popovers from 'components/doc-components/Popovers';
import Figures from 'components/doc-components/Figures';
import Hoverbox from 'components/doc-components/Hoverbox';
import Tables from 'components/doc-components/Tables';
import FormControl from 'components/doc-components/FormControl';
import InputGroup from 'components/doc-components/InputGroup';
import Select from 'components/doc-components/Select';
import Checks from 'components/doc-components/Checks';
import Range from 'components/doc-components/Range';
import FormLayout from 'components/doc-components/FormLayout';
import FloatingLabels from 'components/doc-components/FloatingLabels';
import FormValidation from 'components/doc-components/FormValidation';
import BootstrapCarousel from 'components/doc-components/BootstrapCarousel';
import SlickCarousel from 'components/doc-components/SlickCarousel';
import Navs from 'components/doc-components/Navs';
import Navbars from 'components/doc-components/Navbars';
import Tabs from 'components/doc-components/Tabs';
import Collapse from 'components/doc-components/Collapse';
import CountUp from 'components/doc-components/CountUp';
import Embed from 'components/doc-components/Embed';
import Background from 'components/doc-components/Backgrounds';
import Search from 'components/doc-components/Search';
import VerticalNavbar from 'components/doc-components/VerticalNavbar';
import NavBarTop from 'components/doc-components/NavBarTop';
import ComboNavbar from 'components/doc-components/ComboNavbar';
import TypedText from 'components/doc-components/TypedText';
import FileUploader from 'components/doc-components/FileUploader';
import Borders from 'components/utilities/Borders';
import Colors from 'components/utilities/Colors';
import ColoredLinks from 'components/utilities/ColoredLinks';
import Display from 'components/utilities/Display';
import Visibility from 'components/utilities/Visibility';
import StretchedLink from 'components/utilities/StretchedLink';
import Float from 'components/utilities/Float';
import Position from 'components/utilities/Position';
import Spacing from 'components/utilities/Spacing';
import Sizing from 'components/utilities/Sizing';
import TextTruncation from 'components/utilities/TextTruncation';
import Typography from 'components/utilities/Typography';
import VerticalAlign from 'components/utilities/VerticalAlign';
import Flex from 'components/utilities/Flex';
import Grid from 'components/utilities/Grid';
import WizardForms from 'components/doc-components/WizardForms';
import GettingStarted from 'components/documentation/GettingStarted';
import Configuration from 'components/documentation/Configuration';
import DarkMode from 'components/documentation/DarkMode';
import Plugins from 'components/documentation/Plugins';
import Styling from 'components/documentation/Styling';
import DesignFile from 'components/documentation/DesignFile';
import Starter from 'components/pages/Starter';
import AnimatedIcons from 'components/doc-components/AnimatedIcons';
import DatePicker from 'components/doc-components/DatePicker';
import FontAwesome from 'components/doc-components/FontAwesome';
import Changelog from 'components/documentation/change-log/ChangeLog';
import Analytics from 'components/dashboards/analytics';
import Crm from 'components/dashboards/crm';
import Saas from 'components/dashboards/saas';
import Profile from 'components/pages/user/profile/Profile';
import Associations from 'components/pages/asscociations/Associations';
import Followers from 'components/app/social/followers/Followers';
import Notifications from 'components/app/social/notifications/Notifications';
import ActivityLog from 'components/app/social/activity-log/ActivityLog';
import Settings from 'components/pages/user/settings/Settings';
import Feed from 'components/app/social/feed/Feed';
import Placeholder from 'components/doc-components/Placeholder';
import Lightbox from 'components/doc-components/Lightbox';
import AdvanceTableExamples from 'components/doc-components/AdvanceTableExamples';
import ModalAuth from 'components/authentication/modal/ModalAuth';
import FaqAlt from 'components/pages/faq/faq-alt/FaqAlt';
import FaqBasic from 'components/pages/faq/faq-basic/FaqBasic';
import FaqAccordion from 'components/pages/faq/faq-accordion/FaqAccordion';
import PrivacyPolicy from 'components/pages/miscellaneous/privacy-policy/PrivacyPolicy';
import InvitePeople from 'components/pages/miscellaneous/invite-people/InvitePeople';
import PricingDefault from 'components/pages/pricing/pricing-default/PricingDefault';
import PricingAlt from 'components/pages/pricing/pricing-alt/PricingAlt';
import Invoice from 'components/app/e-commerce/Invoice';
import Billing from 'components/app/e-commerce/billing/Billing';
import Checkout from 'components/app/e-commerce/checkout/Checkout';
import ShoppingCart from 'components/app/e-commerce/cart/ShoppingCart';
import CustomersDetails from 'components/app/e-commerce/customers-details/CustomersDetails';
import OrderDetails from 'components/app/e-commerce/orders/order-details/OrderDetails';
import Products from 'components/app/e-commerce/product/Products';
import ProductDetails from 'components/app/e-commerce/product/product-details/ProductDetails';
import Orders from 'components/app/e-commerce/orders/order-list/Orders';
import Customers from 'components/app/e-commerce/customers/Customers';
import CreateEvent from 'components/app/events/create-an-event/CreateEvent';
import EventList from 'components/app/events/event-list/EventList';
import EventDetail from 'components/app/events/event-detail/EventDetail';
import EmailDetail from 'components/app/email/email-detail/EmailDetail';
import Compose from 'components/app/email/compose/Compose';
import Inbox from 'components/app/email/inbox/Inbox';
import Rating from 'components/doc-components/Rating';
import AdvanceSelect from 'components/doc-components/AdvanceSelect';
import Editor from 'components/doc-components/Editor';

import Kanban from 'components/app/kanban/Kanban';
import DraggableExample from 'components/doc-components/DraggableExample';
import LeafletMapExample from 'components/doc-components/LeafletMapExample';
import Scrollbar from 'components/doc-components/Scrollbar';
import Scrollspy from 'components/doc-components/Scrollspy';
import ReactIcons from 'components/doc-components/ReactIcons';

import Widgets from 'widgets/Widgets';

import Error404 from 'components/errors/Error404';
import Error500 from 'components/errors/Error500';

import SimpleLogin from 'components/pages/Login';


import Dashboard from 'components/dashboards/default';
import AppContext from 'context/Context';

import User from 'components/app/users/User';
import Body from 'components/app/body_type/Body';
import Fashion from 'components/app/fashion/Fashion';
import FashionForm from 'components/app/fashion/PageForm';
import Desire from 'components/app/desires/Desire';
import AdminProfile from 'components/app/admin/Profile';
import ChangePassword from 'components/app/admin/ChangePassword';
import Education from 'components/app/educations/Education';
import EducationForm from 'components/app/educations/PageForm';
import Income from 'components/app/incomes/Income';
import IncomeForm from 'components/app/incomes/PageForm';
import Hair from 'components/app/hair/Hair';
import Eye from 'components/app/eye/Eye';
import Country from 'components/app/country/Country';
import State from 'components/app/state/State';
import Plan from 'components/app/mobile_plan/Plan';
import TermsConditions from 'components/app/terms_conditions/TermsConditions';



const Layout = () => {
  const HTMLClassList = document.getElementsByTagName('html')[0].classList;
  useContext(AppContext);

  useEffect(() => {
    if (is.windows()) {
      HTMLClassList.add('windows');
    }
    if (is.chrome()) {
      HTMLClassList.add('chrome');
    }
    if (is.firefox()) {
      HTMLClassList.add('firefox');
    }
  }, [HTMLClassList]);

  return (
    <>
      <Routes>
        <Route path="landing" element={<Landing />} />
        <Route element={<ErrorLayout />}>
          <Route path="errors/404" element={<Error404 />} />
          <Route path="errors/500" element={<Error500 />} />
        </Route>
        {/*- ------------- Authentication ---------------------------  */}

        {/*- ------------- simple ---------------------------  */}
        <Route element={<AuthSimpleLayout />}>
          <Route path="/admin/login" element={<SimpleLogin />} />
         
        </Route>



        {/* //--- MainLayout Starts  */}

        <Route element={<MainLayout />}>
          {/*Dashboard*/}
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="dashboard/analytics" element={<Analytics />} />
          <Route path="dashboard/crm" element={<Crm />} />
          <Route path="dashboard/saas" element={<Saas />} />
        
          {/* E Commerce */}
          <Route
            path="e-commerce/orders/order-details"
            element={<OrderDetails />}
          />
          <Route path="e-commerce/orders/order-list" element={<Orders />} />
          <Route path="e-commerce/invoice" element={<Invoice />} />
          <Route path="e-commerce/billing" element={<Billing />} />
          <Route path="e-commerce/checkout" element={<Checkout />} />
          <Route path="e-commerce/shopping-cart" element={<ShoppingCart />} />
          <Route path="e-commerce/customers" element={<Customers />} />
          <Route
            path="e-commerce/customer-details"
            element={<CustomersDetails />}
          />

          <Route
            path="e-commerce/product/product-details"
            element={<ProductDetails />}
          />
          <Route
            path="e-commerce/product/product-details/:productId"
            element={<ProductDetails />}calendar
          />

          <Route
            path="e-commerce/product/:productLayout"
            element={<Products />}
          />

          <Route path="e-commerce/invoice" element={<Invoice />} />

          {/*icons*/}
          <Route path="icons/font-awesome" element={<FontAwesome />} />
          <Route path="icons/react-icons" element={<ReactIcons />} />

          {/* maps */}
          <Route path="maps/leaflet-map" element={<LeafletMapExample />} />

          {/*App*/}
          <Route path="/admin/users" element={<User />} />
          <Route path="/admin/profile" element={<AdminProfile />} />
          <Route path="/admin/change_password" element={<ChangePassword />} />
          <Route path="/admin/body/list" element={<Body />} />
          <Route path="/admin/fashion/list" element={<Fashion />} />
          <Route path="/admin/fashion/form" element={<FashionForm />} />  
          <Route path="/admin/desire/list" element={<Desire />} />
          <Route path="/admin/education/list" element={<Education />} />
          <Route path="/admin/education/form" element={<EducationForm />} />
          <Route path="/admin/income/list" element={<Income />} />
          <Route path="/admin/income/form" element={<IncomeForm />} />   
          <Route path="/admin/hair/list" element={<Hair />} />   
          <Route path="/admin/eye/list" element={<Eye />} /> 
          <Route path="/admin/country/list" element={<Country />} />   
          <Route path="/admin/state/list" element={<State />} /> 
          <Route path="/admin/plan/list" element={<Plan />} />   
          <Route path="/admin/terms_conditions/list" element={<TermsConditions />} />   
          


        
        
          <Route path="app/kanban" element={<Kanban />} />
          <Route path="social/feed" element={<Feed />} />
          <Route path="social/activity-log" element={<ActivityLog />} />
          <Route path="social/notifications" element={<Notifications />} />
          <Route path="social/followers" element={<Followers />} />
          <Route path="events/event-detail" element={<EventDetail />} />
          <Route path="events/create-an-event" element={<CreateEvent />} />
          <Route path="events/event-list" element={<EventList />} />

          {/* Email */}
          <Route path="email/email-detail" element={<EmailDetail />} />
          <Route path="email/inbox" element={<Inbox />} />
          <Route path="email/compose" element={<Compose />} />

          {/*Pages*/}
          <Route path="pages/starter" element={<Starter />} />
          <Route path="user/profile" element={<Profile />} />
          <Route path="user/settings" element={<Settings />} />
          <Route path="miscellaneous/associations" element={<Associations />} />
          <Route path="faq/faq-alt" element={<FaqAlt />} />
          <Route path="faq/faq-basic" element={<FaqBasic />} />
          <Route path="faq/faq-accordion" element={<FaqAccordion />} />
          <Route path="pricing/pricing-default" element={<PricingDefault />} />
          <Route path="pricing/pricing-alt" element={<PricingAlt />} />
          <Route
            path="miscellaneous/privacy-policy"
            element={<PrivacyPolicy />}
          />
          <Route
            path="miscellaneous/invite-people"
            element={<InvitePeople />}
          />
          {/* charts-example */}

     
     
       
      

          {/*Components*/}
   
          <Route path="components/animated-icons" element={<AnimatedIcons />} />
          <Route path="components/badges" element={<Badges />} />
          <Route path="components/breadcrumb" element={<Breadcrumbs />} />
          <Route path="components/buttons" element={<Buttons />} />
          <Route path="components/cards" element={<Cards />} />
          <Route path="components/dropdowns" element={<Dropdowns />} />
          <Route path="components/list-group" element={<ListGroups />} />
          <Route path="components/modals" element={<Modals />} />
          <Route path="components/pagination" element={<Pagination />} />
          <Route
            path="components/progress-bar"
            element={<BasicProgressBar />}
          />
          <Route path="components/placeholder" element={<Placeholder />} />
          <Route path="components/spinners" element={<Spinners />} />
          <Route path="components/toasts" element={<Toasts />} />
          <Route path="components/pictures/avatar" element={<Avatar />} />
          <Route path="components/pictures/images" element={<Image />} />
          <Route path="components/pictures/figures" element={<Figures />} />
          <Route path="components/pictures/hoverbox" element={<Hoverbox />} />
          <Route path="components/pictures/lightbox" element={<Lightbox />} />
          <Route path="components/tooltips" element={<Tooltips />} />
          <Route path="components/popovers" element={<Popovers />} />
          <Route path="components/draggable" element={<DraggableExample />} />
          <Route path="components/scrollspy" element={<Scrollspy />} />
          <Route
            path="components/carousel/bootstrap"
            element={<BootstrapCarousel />}
          />
          <Route path="components/carousel/slick" element={<SlickCarousel />} />
          <Route path="components/navs-and-tabs/navs" element={<Navs />} />
          <Route path="tables/basic-tables" element={<Tables />} />
          <Route
            path="tables/advance-tables"
            element={<AdvanceTableExamples />}
          />
          <Route path="forms/basic/form-control" element={<FormControl />} />
          <Route path="forms/basic/input-group" element={<InputGroup />} />
          <Route path="forms/basic/select" element={<Select />} />
          <Route path="forms/basic/checks" element={<Checks />} />
          <Route path="forms/basic/range" element={<Range />} />
          <Route path="forms/basic/layout" element={<FormLayout />} />
          <Route path="forms/advance/date-picker" element={<DatePicker />} />
          <Route path="forms/advance/editor" element={<Editor />} />
       
          <Route
            path="forms/advance/advance-select"
            element={<AdvanceSelect />}
          />
          <Route
            path="forms/advance/file-uploader"
            element={<FileUploader />}
          />
          <Route path="forms/advance/rating" element={<Rating />} />
          <Route path="forms/floating-labels" element={<FloatingLabels />} />
          <Route path="forms/validation" element={<FormValidation />} />
          <Route path="forms/wizard" element={<WizardForms />} />
          <Route path="components/navs-and-tabs/navbar" element={<Navbars />} />
          <Route path="components/navs-and-tabs/tabs" element={<Tabs />} />
          <Route path="components/collapse" element={<Collapse />} />
     
          <Route path="components/countup" element={<CountUp />} />
          <Route path="components/videos/embed" element={<Embed />} />
      
          <Route path="components/background" element={<Background />} />
          <Route path="components/search" element={<Search />} />
          <Route path="components/typed-text" element={<TypedText />} />
          <Route
            path="components/navs-and-tabs/vertical-navbar"
            element={<VerticalNavbar />}
          />
          <Route
            path="components/navs-and-tabs/top-navbar"
            element={<NavBarTop />}
          />
          <Route
            path="components/navs-and-tabs/combo-navbar"
            element={<ComboNavbar />}
          />

          {/*Utilities*/}
          <Route path="utilities/borders" element={<Borders />} />
          <Route path="utilities/colors" element={<Colors />} />
          <Route path="utilities/colored-links" element={<ColoredLinks />} />
          <Route path="utilities/display" element={<Display />} />
          <Route path="utilities/visibility" element={<Visibility />} />
          <Route path="utilities/stretched-link" element={<StretchedLink />} />
          <Route path="utilities/stretched-link" element={<StretchedLink />} />
          <Route path="utilities/float" element={<Float />} />
          <Route path="utilities/position" element={<Position />} />
          <Route path="utilities/spacing" element={<Spacing />} />
          <Route path="utilities/sizing" element={<Sizing />} />
          <Route
            path="utilities/text-truncation"
            element={<TextTruncation />}
          />
          <Route path="utilities/typography" element={<Typography />} />
          <Route path="utilities/vertical-align" element={<VerticalAlign />} />
          <Route path="utilities/flex" element={<Flex />} />
          <Route path="utilities/grid" element={<Grid />} />
          <Route path="utilities/scroll-bar" element={<Scrollbar />} />

          <Route path="widgets" element={<Widgets />} />

          {/*Documentation*/}
          <Route
            path="documentation/getting-started"
            element={<GettingStarted />}
          />
          <Route
            path="documentation/configuration"
            element={<Configuration />}
          />
          <Route path="documentation/styling" element={<Styling />} />
          <Route path="documentation/dark-mode" element={<DarkMode />} />
          <Route path="documentation/plugin" element={<Plugins />} />
          <Route path="documentation/design-file" element={<DesignFile />} />
          <Route path="changelog" element={<Changelog />} />
          <Route path="authentication-modal" element={<ModalAuth />} />
        </Route>

        {/* //--- MainLayout end  */}

        {/* <Navigate to="/errors/404" /> */}
        <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
      </Routes>
      <SettingsToggle />
      <SettingsPanel />
      <ToastContainer
        closeButton={CloseButton}
        icon={false}
        position={toast.POSITION.TOP_RIGHT}
      />
    </>
  );
};

export default Layout;

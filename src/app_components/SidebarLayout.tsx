import { LogoutOutlined } from "@ant-design/icons";
import type { ProSettings } from "@ant-design/pro-components";
import { ProConfigProvider, ProLayout } from "@ant-design/pro-components";
import {
  Alert,
  Avatar,
  Button,
  ConfigProvider,
  Dropdown,
  Form,
  Input,
  message,
  Modal,
} from "antd";
import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import { MdOutlineManageAccounts } from "react-icons/md";
import { TbPasswordUser } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import AppleStoreIcon from "../assets/apple_logo.svg";
import PlayStoreIcon from "../assets/images/google-play-badge.png";
import ChangePassword from "../modules/auth/page/ChangePassword";
import errorHandler from "../modules/common/errorHandler";
import { useUpdateCommissionMutation } from "../redux/api/api";
import { imgHostLink } from "../redux/request";
import { updateSettings } from "../redux/slice/settingsSlice";
import { logout, selectUser } from "../redux/slice/userSlice";
import { webRoutes } from "../route/RouteLinks";
import sidebarLinks from "../route/SidebarLinks";
import { useAppSelector } from "../utils/ReduxHook";

export const SidebarLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useAppSelector(selectUser);

  const [updateCommission, { error, isLoading, isSuccess, isError }] =
    useUpdateCommissionMutation();

  const onFinish = async (values: any) => {
    updateCommission({ btoc_commission: values.btoc_commission });
  };

  // modal for update commission
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  // Retrieve settings from localStorage on component mount
  const [settings, setSetting] = useState<Partial<ProSettings> | undefined>(
    () => {
      const storedSettings = localStorage.getItem("proSettings");
      return storedSettings
        ? JSON.parse(storedSettings)
        : {
            fixSiderbar: true,
            layout: "mix",
            splitMenus: false,
          };
    }
  );

  // Save settings to localStorage whenever it changes
  useEffect(() => {
    if (settings) {
      localStorage.setItem("proSettings", JSON.stringify(settings));
      dispatch(updateSettings(settings));
    }
  }, [settings, dispatch]);

  useEffect(() => {
    isSuccess &&
      (setOpen(false), message.success("Commission Updated Successfully"));
    if (isError && error !== undefined) {
      errorHandler(error);
    }
  }, [isSuccess, isError]);

  if (typeof document === "undefined") {
    return <div />;
  }

  const [isChangePassModalOpen, setIsChangePassModalOpen] = useState(false);

  return (
    <div id="test-pro-layout">
      <ProConfigProvider hashed={false}>
        <ConfigProvider
          getTargetContainer={() => {
            return document.getElementById("test-pro-layout") || document.body;
          }}
        >
          <ProLayout
            prefixCls="my-prefix"
            {...sidebarLinks(user?.btoc_commission)}
            location={location}
            onMenuHeaderClick={() => navigate(webRoutes.home)}
            menuItemRender={(item, dom) => (
              <a
                onClick={(e) => {
                  e.preventDefault();
                  item.path && navigate(item.path);
                }}
                href={item.path}
                className="sidebar-link"
              >
                {dom}
              </a>
            )}
            // disableMobile
            token={{
              header: {
                colorBgMenuItemSelected: "rgba(0,0,0,0.04)",
                colorBgHeader:
                  settings?.navTheme === "realDark" ? "#0000" : "#d1e9ff",
              },
              sider: {
                colorBgMenuItemSelected: "#F7F7F7",
                colorMenuBackground:
                  settings?.navTheme === "realDark"
                    ? "#0000"
                    : "linear-gradient(121.52deg, rgb(93, 127, 158) 0%, rgb(9 85 156) 77.49%)",
                colorTextMenuSelected:
                  settings?.navTheme === "light" ? "rgb(0, 53, 102)" : "#fff",
                colorTextMenu: "#fff",
                colorBgMenuItemHover: "transparent",
                colorTextMenuItemHover: "rgb(0, 53, 102)",
              },
            }}
            siderMenuType="sub"
            menu={{
              collapsedShowGroupTitle: true,
            }}
            footerRender={() => (
              <div className="flex flex-col-reverse items-center justify-around gap-4 p-4 lg:flex-row">
                <h3 className="text-sm md:text-md">
                  {/* Support Details: Cell: 01958398325, 01958398328, 01958398344{" "}
                  <br />
                  (10:00AM to 06:00PM) | Email: sup.m360ict@gmail.com */}
                </h3>
                <span className="">
                  <div className="flex items-center gap-4 ">
                    <a
                      href="https://play.google.com/store/apps/details?id=com.m360ict.Sky HomeOTAB2B"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        src={PlayStoreIcon}
                        alt="Google Play Store"
                        className="md:scale-125 w-36 "
                      />
                    </a>

                    <a
                      href="https://apps.apple.com/pk/app/Sky Home-ota-b2b/id6480446492"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        src={AppleStoreIcon}
                        alt="Apple Store"
                        className="w-30 md:w-36"
                      />
                    </a>
                  </div>
                </span>
              </div>
            )}
            menuFooterRender={(props) => {
              if (props?.collapsed) return undefined;
              return (
                <>
                  <div
                    style={{
                      textAlign: "center",
                      paddingBlockStart: 12,
                      color: "#fff",
                    }}
                  >
                    <div>Sky Home</div>
                  </div>
                </>
              );
            }}
            siderWidth={220}
            avatarProps={{
              src: "https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg",
              size: "small",
              title: user?.name,
              render: (props, dom) => {
                return (
                  <>
                    <Dropdown
                      menu={{
                        items: [
                          {
                            key: "MYACCOUNT",
                            icon: (
                              <MdOutlineManageAccounts className="text-[18px]" />
                            ),
                            label: "My Account",
                            onClick: () => {
                              navigate("/myAccount");
                            },
                          },
                          {
                            key: "Change Password",
                            icon: <TbPasswordUser className="text-[18px]" />,
                            label: "Change Password",
                            onClick: () => {
                              setIsChangePassModalOpen(true);
                            },
                          },
                          {
                            key: "logout",
                            icon: <LogoutOutlined />,
                            label: "Sign Out",
                            onClick: () => {
                              dispatch(logout());
                              navigate("/login");
                            },
                          },
                        ],
                      }}
                    >
                      <a
                        className="flex items-center gap-2 ant-dropdown-link"
                        onClick={(e) => e.preventDefault()}
                      >
                        <Avatar
                          src={`${imgHostLink}/${user?.photo}`}
                          size="default"
                          style={{ cursor: "pointer" }}
                        />
                        <span className="overflow-hidden truncate sm:max-w-[3vw] max-w-[20vw]">
                          {user?.name}
                        </span>
                      </a>
                    </Dropdown>
                    <ChangePassword
                      isChangePassModalOpen={isChangePassModalOpen}
                      setIsChangePassModalOpen={setIsChangePassModalOpen}
                    />
                  </>
                );
              },
            }}
            actionsRender={(props) => {
              if (props.isMobile) return [];
              if (typeof window === "undefined") return [];
              if (!user?.btoc_commission) return [];
              return [
                props.layout !== "side" && document.body.clientWidth > 1200 ? (
                  <>
                    <Alert
                      onClick={showModal}
                      showIcon
                      style={{
                        textAlign: "center",
                        width: "300px",
                        height: "32px",
                      }}
                      message={
                        user?.btoc_commission &&
                        `B2C Commission : ${user?.btoc_commission} %`
                      }
                      type="info"
                    />
                    <Modal
                      footer={null}
                      title="Update B2C Commission"
                      open={open}
                      onCancel={handleCancel}
                    >
                      <Form
                        initialValues={{
                          btoc_commission: user?.btoc_commission,
                        }}
                        layout="vertical"
                        style={{
                          marginTop: "20px",
                        }}
                        onFinish={onFinish}
                      >
                        <Form.Item
                          style={{ marginBottom: "10px" }}
                          name="btoc_commission"
                          label="B2C Commission"
                          rules={[
                            {
                              required: true,
                              message: "Please input  B2C Commission",
                            },
                            {
                              pattern: /^(0|[1-9]\d?|99)(\.\d{1,2})?$/,
                              message:
                                "Form Dhaka must be a number between 0 and 99.99",
                            },
                          ]}
                        >
                          <Input placeholder="Update B2C Commission" />
                        </Form.Item>

                        <Form.Item
                          style={{
                            marginBottom: "0px",
                          }}
                        >
                          <div className="flex items-center justify-end w-full">
                            <Button
                              style={{ marginRight: "10px" }}
                              onClick={handleCancel}
                            >
                              Cancel
                            </Button>

                            <Button
                              loading={isLoading}
                              type="primary"
                              htmlType="submit"
                            >
                              Submit
                            </Button>
                          </div>
                        </Form.Item>
                      </Form>
                    </Modal>
                  </>
                ) : undefined,
              ];
            }}
            headerTitleRender={(logo, title, _) => {
              const defaultDom = (
                <>
                  {/* <img
                    className="object-contain w-56"
                    style={{ minHeight: "45px" }}
                    src={imgHostLink + `/${user.agency_logo}`}
                    alt="Header Logo"
                  /> */}
                  <div className="w-45 px-10">
                    <h1 className="font-semibold">Sky Home</h1>
                  </div>

                  <div
                    className=" 2xl:w-[83%] xl:w-[70%]"
                    // style={{
                    //   backgroundColor:
                    //     settings?.navTheme === "light"
                    //       ? "rgb(163 211 255)"
                    //       : "rgb(26 26 26)",
                    // }}
                  >
                    <Marquee
                      className="marquee-container"
                      gradient={false}
                      pauseOnHover={true}
                      speed={40}
                    >
                      Experience VIP services with complimentary seat assignment
                      on Sky Home OTA. Book now for unparalleled service!
                      <span className="ms-16"></span>
                    </Marquee>
                  </div>
                </>
              );
              if (typeof window === "undefined") return defaultDom;
              if (document.body.clientWidth < 1400) {
                return defaultDom;
              }
              if (_.isMobile) return defaultDom;
              return <>{defaultDom}</>;
            }}
            {...settings}
          >
            <Outlet />
            {/* <SettingDrawer
              hideCopyButton
              hideHintAlert
              enableDarkTheme
              getContainer={(e: any) => {
                if (typeof window === "undefined") return e;
                return document.getElementById("test-pro-layout");
              }}
              settings={settings}
              onSettingChange={(changeSetting) => {
                setSetting(changeSetting);
              }}
              disableUrlParams={true}
            /> */}
          </ProLayout>
        </ConfigProvider>
      </ProConfigProvider>
    </div>
  );
};

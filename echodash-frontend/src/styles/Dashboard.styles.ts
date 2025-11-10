import styled from "@emotion/styled"

export const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f9fafb;
  position: relative;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`
export const Sidebar = styled.div<{ isOpen?: boolean }>`
  width: 260px;
  background: #ffffff;
  box-shadow: 1px 0 2px rgba(0, 0, 0, 0.08);
  padding: 24px 0;
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
  transition: all 0.3s ease;
  z-index: 100;

  @media (max-width: 768px) {
    position: fixed;
    height: 100vh;
    left: 0;
    top: 0;
    width: 280px;
    transform: ${p => (p.isOpen ? "translateX(0)" : "translateX(-100%)")};
    box-shadow: 1px 0 2px rgba(0, 0, 0, 0.08);
    z-index: 1100;
  }

  @media (max-width: 420px) {
    width: 85vw;
  }
`
export const SidebarHeader = styled.div`
  padding: 0 24px 20px;
  border-bottom: 1px solid #e1e5ea;
  margin-bottom: 12px;
`
export const SidebarTitle = styled.h2`
  margin: 0;
  color: #1976d2;
  font-size: 1.45rem;
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 1.3rem;
    padding-left:2.5rem;
  }
`
export const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`
export const NavItem = styled.li<{ active?: boolean }>`
  margin: 2px 0;

  a {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 14px 22px;
    color: ${p => (p.active ? "#1976d2" : "#555")};
    background: ${p => (p.active ? "rgba(25,118,210,0.08)" : "transparent")};
    text-decoration: none;
    font-weight: ${p => (p.active ? "600" : "500")};
    border-right: ${p =>
      p.active ? "3px solid #1976d2" : "3px solid transparent"};
    border-radius: 0 8px 8px 0;
    font-size: 0.95rem;
    transition: 0.2s ease;
    cursor: pointer;

    &:hover {
      background: rgba(25, 118, 210, 0.05);
      color: #1976d2;
      transform: scale(0.995);
    }

    @media (max-width: 768px) {
      font-size: 1rem;
      padding: 16px 26px;
    }
  }
`
export const MainContent = styled.div`
  flex: 1;
  padding: 20px;
  padding-top: 40px;
  overflow: auto;

  @media (max-width: 768px) {
    padding: 12px;
    padding-top: 86px;
  }
`
export const MobileMenuButton = styled.button`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    position: fixed;
    top: 14px;
    left: 14px;
    z-index: 1200;
    background: #1976d2;
    color: white;
    border: none;
    border-radius: 10px;
    padding: 10px 12px;
    font-size: 1.25rem;
    cursor: pointer;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
    transition: 0.2s;

    &:active {
      transform: scale(0.95);
    }
  }
`
export const MobileOverlay = styled.div`
  @media (max-width: 768px) {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 1050;
  }
`
export const MobileHeader = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    align-items: center;
    justify-content: center;
    background: white;
    padding: 18px;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
    z-index: 100;
  }
`
export const MobileTitle = styled.h1`
  color: #222;
  font-weight: 700;
  font-size: 1.35rem;
  margin: 4px;
`

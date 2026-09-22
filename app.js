"use strict";

const data = window.TEAM_DATA || {};
const teamName = typeof data.teamName === "string" && data.teamName.trim()
  ? data.teamName.trim() : "Robotic Cellist & Glockenspiel (Fall 2026)";
document.getElementById("team-name").textContent = teamName;
document.title = `Purdue AIM · ${teamName}`;

const rows = document.getElementById("assignment-rows");
for (let week = 1; week <= 16; week++) {
  const assignment = (Array.isArray(data.weeks) ? data.weeks : []).find(item => item.week === week) || {};
  const row = document.createElement("tr");
  row.id = `week-${week}`;
  const label = document.createElement("th");
  label.scope = "row";
  label.textContent = `Week ${week}`;
  row.append(label);
  for (const [key, name] of [["robotCello", "Robotic Cellist"], ["glockenspiel", "Glockenspiel"]]) {
    const cell = document.createElement("td");
    const entry = assignment[key];
    const content = typeof entry === "string" ? entry.trim()
      : typeof entry?.text === "string" ? entry.text.trim() : "";
    cell.dataset.project = name;
    cell.textContent = entry === null ? "" : content || "Not posted yet";
    if (content && typeof entry?.url === "string") {
      try {
        const url = new URL(entry.url, document.baseURI);
        if (["https:", "http:", "file:"].includes(url.protocol)) {
          const link = document.createElement("a");
          link.href = url.href;
          link.textContent = content;
          link.target = "_blank";
          link.rel = "noopener noreferrer";
          cell.replaceChildren(link);
        }
      } catch { /* Keep the assignment text if its attachment URL is invalid. */ }
    }
    if (!content) cell.className = "pending";
    row.append(cell);
  }
  rows.append(row);
}

if (typeof data.driveUrl === "string" && data.driveUrl.trim()) {
  try {
    const url = new URL(data.driveUrl);
    if (url.protocol === "https:") {
      const link = document.createElement("a");
      link.href = url.href;
      link.className = "drive-link";
      link.textContent = "Open shared Drive";
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      document.getElementById("drive-content").replaceChildren(link);
    }
  } catch { /* Keep the empty state until a valid link is supplied. */ }
}

const members = Array.isArray(data.members) ? data.members : [];
if (members.length) {
  const groups = new Map();
  for (const member of members) {
    if (!member) continue;
    const memberName = typeof member.name === "string" ? member.name.trim() : "";
    if (!memberName) continue;
    const item = document.createElement("li");
    const name = document.createElement("span");
    name.className = "member-name";
    name.textContent = memberName;
    item.append(name);
    for (const [label, address] of [["Gmail", member.gmail], ["Purdue", member.purdueEmail]]) {
      const row = document.createElement("div");
      row.className = "member-email-row";
      const caption = document.createElement("span");
      caption.className = "member-email-label";
      caption.textContent = `${label}: `;
      row.append(caption);
      const email = typeof address === "string" ? address.trim() : "";
      if (/^[^\s@?&#]+@[^\s@?&#]+\.[^\s@?&#]+$/.test(email)) {
        const link = document.createElement("a");
        link.className = "member-email";
        link.href = `mailto:${encodeURIComponent(email)}`;
        link.textContent = email;
        row.append(link);
      } else {
        const missing = document.createElement("span");
        missing.className = "pending";
        missing.textContent = "Not provided";
        row.append(missing);
      }
      item.append(row);
    }
    const group = typeof member.team === "string" && member.team.trim() ? member.team.trim() : "Team members";
    if (!groups.has(group)) {
      const list = document.createElement("ul");
      list.className = "member-list";
      groups.set(group, list);
    }
    groups.get(group).append(item);
  }
  if (groups.size) {
    const content = document.createDocumentFragment();
    for (const [group, list] of groups) {
      const section = document.createElement("div");
      section.className = "member-group";
      const heading = document.createElement("h3");
      heading.className = "member-group-title";
      heading.textContent = group;
      section.append(heading, list);
      content.append(section);
    }
    document.getElementById("member-content").replaceChildren(content);
  }
}

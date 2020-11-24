const username = "jnti";

var links = [
  {
    name: "GitHub",
    url: "https://github.com/" + username
  },
  {
    name: "Portfolio",
    url: "https://" + username + ".github.io/Portfolio/"
  },
  {
    name: "My Personal Project",
    url: "https://smartracker.live/"
  }
];

var socialLinks = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/sang-im-39b0b7143/"
  }
];

class LinksTransformer {
  constructor(links) {
    this.links = links;
  }

  async element(element) {
    if (element.tagName == "title") {
      element.setInnerContent("Sang Im");
    } else if (element.tagName == "body") {
        element.setAttribute("class", "bg-orange-400");
    } else if (element.getAttribute("id") == "links") {
        links.forEach((link) => {
          element.append("<a href=" + link.url + ">" + link.name + "</a>", { html: true });
        });
    } else if (element.getAttribute("id") == "profile") {
        element.removeAttribute("style");
    } else if (element.getAttribute("id") == "avatar") {
        element.setAttribute("src", "https://media-exp1.licdn.com/dms/image/C5603AQEe-Qp4DDEaFg/profile-displayphoto-shrink_200_200/0?e=1608768000&v=beta&t=E9nFjzbUPosCmCLKarvg5kXdHX9--5EXmnFAk6osfFs");
    } else if (element.getAttribute("id") == "name") {
        element.setInnerContent(username);
    } else if (element.getAttribute("id") == "social") {
        element.removeAttribute("style");
        socialLinks.forEach((socialLink) => {
          element.append("<a href=" + socialLink.url + ">", { html: true });
          element.append("<svg role=\"img\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><title>LinkedIn icon</title><path d=\"M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z\"/></svg>", { html: true });
          element.append("</a>", { html: true });
        });
    }
  }
}

addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  let response;
  if (request.url == "https://myassignment.sangim.workers.dev/links") {
    response = new Response(JSON.stringify(links), {
      headers: { "content-type": "application/json" }
    })
  } else {
    const res = await fetch("https://static-links-page.signalnerve.workers.dev");
    return new HTMLRewriter().on("*", new LinksTransformer()).transform(res)
  }
  return response;
}

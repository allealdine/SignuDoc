import { defineMessages } from "../define-messages.ts";

export const enMessages = defineMessages({
  common: {
    and: "and",
    lastUpdated: "Last updated {date}",
  },
  contact: {
    form: {
      company: "Company",
      email: "Email",
      emailPlaceholder: "you@example.com",
      errors: {
        botRejected:
          "The request could not be accepted. Please try again in a moment.",
        email: "Enter a valid email address",
        generic: "Something went wrong. Please try again.",
        message: "Enter a message",
        messageTooLong: "Message must be 5000 characters or fewer",
        name: "Enter your name",
        reviewFields: "Please review the highlighted fields.",
        tooManyRequests: "Too many requests. Please try again soon.",
        unavailable: "Contact form is temporarily unavailable.",
      },
      message: "Message",
      messagePlaceholder:
        "Tell us what you need, and include any account email, sender name, document title, or link that helps us identify the request.",
      name: "Name",
      namePlaceholder: "Your name",
      sending: "Sending...",
      submit: "Send message",
      success:
        "Your message was sent. We’ll follow up at {email} if we need more detail.",
    },
    hero: {
      description:
        "Use the form below for product support, privacy requests, accessibility accommodations, legal notices, or questions about a document sent through Sakta.",
      title: "Contact",
    },
    metadata: {
      description:
        "Get in touch with Sakta for support, privacy questions, accessibility requests, or legal inquiries.",
      title: "Contact | Sakta",
    },
  },
  dashboard: {
    card: {
      context: {
        completed: "Sent to: {emails}",
        completedEmpty: "Sent to: —",
        declined: "Declined by: {email}",
        draftFields: "{count} field placed",
        draftFieldsPlural: "{count} fields placed",
        draftSigners: "{count} signer",
        draftSignersPlural: "{count} signers",
        expiredWaiting: "Expired {date} · was waiting on: {emails}",
        sentWaiting: "Waiting on: {emails}",
        voided: "Voided on {date}",
      },
      created: "Created",
      sentBy: "Sent by",
      status: "Status: {status}",
      statuses: {
        completed: "Completed",
        declined: "Declined",
        draft: "Draft",
        expired: "Expired",
        sent: "Sent",
        signedProgress: "{signed} of {total} signed",
        voided: "Voided",
      },
    },
    empty: {
      install: {
        description: "Nobody in your organization has started an envelope.",
        title: "No envelopes yet",
      },
      mine: {
        description: "Upload a PDF and send it for signatures in minutes.",
        title: "No documents yet",
      },
      results: {
        description: "Try a different title, signer email, or status filter.",
        reset: "Reset filters",
        title: "No documents match your search",
      },
    },
    error: {
      message: "We couldn't load your documents. Please try again.",
      retry: "Retry",
    },
    filters: {
      All: "All",
      Completed: "Completed",
      Declined: "Declined",
      Draft: "Draft",
      Sent: "Sent",
      Voided: "Voided",
      label: "Filter documents",
    },
    header: {
      action: "New envelope",
      allDescription: "Every envelope in your organization, whoever sent it.",
      allTitle: "All envelopes",
      description:
        "Track drafts, sent envelopes, and completed agreements in one place.",
      title: "Documents",
      viewEveryone: "Everyone's",
      viewLabel: "Whose envelopes",
      viewMine: "Mine",
    },
    pagination: {
      label: "Pages",
      newer: "Newer",
      older: "Older",
    },
    search: "Search by title or email...",
    showing: "Showing {shown} of {total} envelopes",
    showingOnPage: "Showing {shown} of {total} envelopes on this page",
    upload: "Upload a PDF",
  },
  templates: {
    card: {
      meta: "{pageCount} · {fieldCount} · {saved}",
      roleAriaLabel: "Signers in {templateName}",
      roleItem: "{index}. {name}",
      saved: "Saved {date}",
    },
    counts: {
      field: "{count} field",
      fields: "{count} fields",
      page: "{count} page",
      pages: "{count} pages",
    },
    delete: {
      cancel: "Cancel",
      confirm: "Delete template",
      deleting: "Deleting...",
      description: {
        removed: "“{templateName}” will be removed for good.",
        retained: "Documents you already made from it are not affected.",
      },
      error: "Unable to delete this template.",
      title: "Delete this template?",
      triggerAriaLabel: "Delete the template {templateName}",
      triggerLabel: "Delete",
    },
    empty: {
      action: "Go to documents",
      description:
        "Open any document you have prepared or sent and choose Save as template. Next time, you only name the people who sign.",
      title: "No templates yet",
    },
    error: {
      description: "We couldn't load your templates. Try again in a moment.",
      retry: "Retry",
      title: "Couldn't load templates",
    },
    header: {
      description:
        "Documents you send often, with their fields and signing order already in place.",
      title: "Templates",
    },
    sendToMany: "Send to many",
    use: "Use template",
  },
  settings: {
    account: {
      genericError: "Something went wrong. Please try again.",
      closure: {
        blockedReason:
          "You are the only administrator. Make someone else an administrator first, then close your account.",
        cancel: "Cancel",
        confirm: "Request closure",
        confirmationLabel: 'Type "{phrase}" to confirm:',
        dangerZone: "Danger zone",
        hostedCopy:
          "Before closing your account, download any documents you want to keep. After closure, {productName} keeps a 30-day export window and then deletes your stored documents, templates and envelope records. Signers keep the copies they were emailed.",
        request: "Request account closure",
        requesting: "Requesting...",
        selfHostedCopy:
          "Before closing your account, download any documents you want to keep. After 30 days your drafts, unfinished envelopes and templates are deleted. Finished documents and their audit trails stay with {productName}: they move to an administrator, because they are the organization's records.",
        success:
          "We've received your request. Download any documents you want to keep within 30 days.",
        title: "Request account closure?",
      },
      header: {
        description:
          "Manage your sender profile, password, two-step sign-in and account lifecycle.",
        title: "Settings",
      },
      password: {
        breached: "Choose a password that hasn't appeared in a breach",
        correctFields: "Please correct the highlighted fields.",
        currentIncorrect: "Current password is incorrect",
        currentRequired: "Enter your current password",
        emailResetLink: "Email me a reset link",
        helper: "Must be at least 15 characters",
        labelCurrent: "Current password",
        labelNew: "New password",
        sending: "Sending...",
        success: {
          resetSent: "Password reset link sent.",
          updated: "Password updated.",
        },
        title: "Password",
        tooShort: "Password must be at least 15 characters",
        updating: "Updating...",
        update: "Update password",
      },
      profile: {
        correctFields: "Please correct the highlighted fields.",
        emailDifferent: "Enter a different email address",
        emailInvalid: "Enter a valid email address",
        emailNote:
          "Email changes are verified through your current inbox first, then the new inbox.",
        emailRegistered: "This email is already registered",
        fullNameRequired: "Enter your full name",
        labelEmail: "Email",
        labelFullName: "Full name",
        save: "Save changes",
        saving: "Saving...",
        success: {
          emailSteps:
            "If the email change can proceed, you'll receive the next steps by email.",
          updated: "Profile updated.",
          updatedWithEmailSteps:
            "Profile updated. If the email change can proceed, you'll receive the next steps by email.",
        },
        title: "Profile",
      },
    },
    organization: {
      addresses: {
        sender: {
          envHelper: "Set by the RESEND_FROM_EMAIL environment variable.",
          helper:
            "The address emails come from, at a domain you own. A subdomain such as notifications@sign.yourcompany.com keeps this site's mail apart from your everyday email.",
          label: "Send email from",
          placeholder: "sign@yourcompany.com",
        },
        support: {
          envHelper: "Set by the SUPPORT_EMAIL environment variable.",
          helper: "Where replies and questions from signers go.",
          label: "Support address",
          placeholder: "help@yourcompany.com",
        },
        title: "Email addresses",
      },
      disclosure: {
        cancel: "Cancel",
        description:
          "Optional. Signers read this and tick a box to agree to use electronic records and signatures before they sign. Leave it empty to use the standard text, or press “Start from the standard text” to edit it. The words each signer saw are kept with their record.",
        formatHelp:
          "Separate paragraphs with a blank line. Start a line with ## and a space to make a heading. Write {sender} where the sender's name goes and {contact} where the address to write to goes.",
        label: "Disclosure text",
        placeholder: "Standard text",
        startFromStandard: "Start from the standard text",
        title: "What signers agree to before signing",
        useStandard: "Use the standard text",
      },
      email: {
        adding: "Adding...",
        checkRecords: "Check DNS records",
        checking: "Checking...",
        checkingEmail: "Checking email…",
        dns: {
          caption: "DNS records to add for {domain}",
          empty:
            "Resend did not list any records for {domain}. Open Resend to see them.",
          found: "Found",
          name: "Name",
          notFound: "Not found yet",
          priority: "Priority {priority}",
          status: "Status",
          type: "Type",
          value: "Value",
        },
        openResend: "Open Resend",
        sendTest: "Send me a test email",
        sending: "Sending...",
        setUp: "Set up {domain}",
        states: {
          capture: {
            line: "This is a development setup. Emails are saved to a folder on this machine instead of being sent.",
            title: "Emails are being captured, not sent",
          },
          domainMissing: {
            line: "{domain} has not been added to your Resend account yet. Set it up here to get the DNS records that prove you own it.",
            title: "{domain} needs to be set up",
          },
          domainPending: {
            line: "Add these records where {domain}'s DNS is managed, then check them. DNS changes can take a few minutes to be seen, and sometimes longer.",
            mayAlreadySend:
              "Resend has verified part of this domain, so sending may already work. Send yourself a test email to find out. If it arrives, email is working.",
            title: "Waiting for {domain}'s DNS records",
          },
          error: {
            line: "Resend could not be asked about this site's email: {message}",
            title: "Email could not be checked",
          },
          missingKey: {
            line: "This site has no Resend API key, so it cannot send anything: no sign-up confirmations and no signing invitations.",
            steps: {
              marketplace: {
                label: "Resend on the Vercel Marketplace",
                text: "Open Resend on the Vercel Marketplace. Choose Install (or Connect Project if your team already has Resend) and connect it to this project.",
              },
              redeploy:
                "Open Deployments, open the ••• menu on the latest Production deployment and choose Redeploy. Environment variables only reach deployments made after they were added, so a site deployed before Resend was connected still has no key until it is redeployed.",
              reload: "When the new deployment is ready, reload this page.",
              resendKeys: {
                label: "Resend API keys",
                text: "Create an API key in Resend with full access, so this page can add your domain and check its DNS records.",
              },
              restart: "Restart the app, then reload this page.",
              variable:
                "In this project on Vercel, open Settings, then Environment Variables, and check that RESEND_API_KEY is listed for Production.",
              variableNonVercel:
                "Set it as the RESEND_API_KEY environment variable where this site runs.",
            },
            title: "Email is not connected",
          },
          ready: {
            line: "Emails are sent from {senderAddress}, and {domain} is verified.",
            title: "Email is working",
          },
          restrictedKey: {
            line: "This site's Resend key is only allowed to send email, so it cannot check {domain} from here. Open Resend to add the domain and see its DNS records.",
            secondLine:
              "When that is done, send yourself a test email. If it arrives, email is working.",
            title: "Finish the domain in Resend",
          },
          testSender: {
            firstLine:
              "Emails are going out from Resend's shared test address ({senderAddress}). Resend only delivers those to the owner of the Resend account, so signers and new users will not receive anything yet.",
            secondLine:
              'Enter an address at your own domain in "Send email from" above and save. The DNS records to add will appear here.',
            title: "Email only reaches you so far",
          },
        },
        testSent: "Test email sent to {to}. Check that inbox.",
        title: "Email setup",
      },
      genericError: "Something went wrong. Please try again.",
      header: {
        description:
          "These settings apply to everyone who uses this site. Only you, the administrator, can see and change them.",
        eyebrow: "Administrator",
        title: "Organization",
      },
      legalLinks: {
        description:
          "Optional. Links to pages on your own website, shown in the footer of this site and of its emails.",
        notice: {
          after: ". Check that it is right for your organization.",
          before: "Without a privacy policy link, signers see ",
          link: "a notice built from these settings",
        },
        privacy: {
          label: "Privacy policy link",
          placeholder: "https://yourcompany.com/privacy",
        },
        terms: {
          label: "Terms link",
          placeholder: "https://yourcompany.com/terms",
        },
        title: "Your terms and privacy policy",
      },
      name: {
        helper: "Shown in the header and in every email this site sends.",
        label: "Organization name",
      },
      retention: {
        description:
          "Optional. After this many days a completed, declined or voided envelope is deleted with its audit trail. Its sender is emailed 30 days before. Leave empty to keep them until someone deletes them. Many records must be kept for years, so check what applies to you before setting this.",
        label: "Days to keep",
        part11Helper:
          "Off while Part 11 mode is on: those records are deleted by hand only.",
        placeholder: "Keep until deleted",
        title: "How long to keep finished documents",
      },
      save: {
        label: "Save organization settings",
        saving: "Saving...",
      },
      saved: "Organization settings saved.",
      signup: {
        domains: {
          helper: "Separate several domains with commas.",
          label: "Email domains",
          placeholder: "yourcompany.com",
        },
        legend: "Who can create an account",
        note: "This is about people who send documents. People who are sent a document to sign don't need an account.",
        options: {
          closed: {
            description: "Nobody new can create an account.",
            label: "Nobody",
          },
          domains: {
            description:
              "Only people whose email address is at one of your domains can create an account.",
            label: "People at my organization",
          },
          open: {
            description: "Anyone who finds this site can create an account.",
            label: "Anyone",
          },
        },
        part11Note:
          "Part 11 mode is on, so this covers signers too. A Part 11 envelope goes only to someone with an account here whose identity an administrator has confirmed under People, so choose a rule that lets the people you send to create one.",
      },
    },
    apiKeys: {
      copy: "Copy",
      copied: "Copied",
      done: "Done",
      form: {
        access: "Access",
        creating: "Creating...",
        create: "Create key",
        expires: "Expires",
        expiry30: "In 30 days",
        expiry90: "In 90 days",
        expiryNever: "Never",
        expiryYear: "In a year",
        name: "Name",
        namePlaceholder: "For example: Billing app",
        scopeRead: "Read only",
        scopeWrite: "Read and write",
      },
      genericError: "Something went wrong. Please try again.",
      header: {
        descriptionAfter:
          ". A key acts as the administrator who made it: what it sends shows in their documents. Keys skip two-step sign-in, so keep them in the app's secret settings, never in a browser, and revoke one as soon as it may have leaked.",
        descriptionBefore:
          "Let another app create and send envelopes through the ",
        docsLink: "Sakta API",
        title: "API keys",
      },
      list: {
        ariaLabel: "API keys",
        empty: "No keys yet.",
        loadError: "The keys could not be loaded. {error}",
        meta: {
          expires: " Expires {date}.",
          lastUsed: "Last used {date}.",
          madeBy: "Made by {ownerName} on {date}.",
          notUsed: "Not used yet.",
        },
        ownerClosing:
          "{ownerName} is closing their account, so apps using this key are turned away. It is deleted with the account.",
        retry: "Try again",
        scopeRead: "Read only",
        scopeWrite: "Read and write",
        staleError: "The list may be out of date. {error}",
      },
      newKeyNotice: "Copy the key for {name} now. It is not shown again.",
      revoke: {
        ariaLabel: "Revoke {name}",
        cancel: "Cancel",
        confirm: "Revoke this key? Apps using it stop working at once.",
        label: "Revoke",
        revoking: "Revoking...",
        stoppedConfirm: "Revoke this key? It can never be used again.",
      },
      status: {
        active: "Active",
        expired: "Expired",
        revoked: "Revoked",
        stopped: "Stopped",
      },
    },
    branding: {
      color: {
        default: "Use the default",
        helper:
          "Six letters and digits, such as #1a73e8. Leave empty for the default. Saved with the button below.",
        label: "Brand color",
        lightWarning:
          "This color is too light for white text to be read on it, so a darker shade of it is used.",
        pickerAriaLabel: "Color picker",
      },
      description:
        "Optional. Your logo goes in the header of this site, on the pages signers see and at the top of emails. Your color is used for buttons and links.",
      genericError: "Something went wrong. Please try again.",
      logo: {
        ariaLabel: "Logo image",
        empty: "No logo yet. The header shows your organization’s name.",
        fileHelper:
          "PNG, JPEG or WebP, up to 512 KB. A wide logo on a transparent background works best. It is saved as soon as you choose it.",
        invalidType: "The logo must be a PNG, JPEG or WebP image.",
        remove: "Remove logo",
        removing: "Removing...",
        replace: "Replace logo",
        subtitle: "Logo",
        title: "Logo and color",
        upload: "Upload a logo",
        uploading: "Uploading...",
        tooLarge: "The logo must be 512 KB or smaller.",
      },
      preview: { button: "Button", link: "Link", status: "Status" },
    },
    embedding: {
      add: "Allow site",
      adding: "Adding...",
      ariaLabel: "Sites allowed to embed signing",
      descriptionAfter:
        ". No invitations are emailed for those: the app signs the person in and says who they are, so list only sites you trust. Every other page of Sakta stays impossible to frame.",
      descriptionBefore:
        "Let an app show the signing page inside its own site, for envelopes it sends through the API with ",
      docsLink: "embedded delivery",
      empty: "No sites yet, so embedded signing is off.",
      genericError: "Something went wrong. Please try again.",
      listError: "The allowed sites could not be loaded. {error}",
      remove: "Remove",
      removeAriaLabel: "Remove {origin}",
      removing: "Removing...",
      retry: "Try again",
      site: { label: "Site", placeholder: "https://app.example.com" },
      staleError: "The list may be out of date. {error}",
      title: "Embedded signing",
    },
    part11: {
      description:
        "For regulated records. While it is on, envelopes are sent only to people with an account here whose identity an administrator has confirmed under People. Each signer gives their email address and password to open the document and again to sign, and confirms what the signature means, which is printed beside it with their name and the time. Five wrong passwords lock the account for signing and email the administrators. Finished envelopes are never deleted by the retention period or a data request, and a void needs a reason.",
      disclaimer:
        "Turning it on does not by itself make this site compliant. Your organization still validates the system, writes and follows its own procedures, trains its people and certifies its electronic signatures to the FDA.",
      genericError: "Something went wrong. Please try again.",
      off: "Off",
      on: "On",
      saving: "Saving...",
      title: "FDA 21 CFR Part 11 mode",
      turnOff: "Turn off Part 11 mode",
      turnOn: "Turn on Part 11 mode",
    },
    people: {
      confirmIdentity: {
        ariaLabel: "Confirm {name}'s identity",
        cancel: "Cancel",
        label: "How did you check who this is?",
        placeholder: "For example: passport seen in person, HR record 4417",
        save: "Save",
        saving: "Saving...",
        title: "Confirm identity",
      },
      description:
        "Everyone with an account here. Administrators can change these settings, answer signer data requests and receive the finished documents of accounts that are closed. When someone stops being an administrator, the documents they received that way move to an administrator who stays. Keep at least two, so that one person leaving does not lock everyone out.",
      empty: "Nobody matches that.",
      genericError: "Something went wrong. Please try again.",
      identity: {
        confirmed: "Identity confirmed",
        notConfirmed: "Identity not confirmed",
        takeBack: "Take back confirmation",
        takeBackAriaLabel: "Take back {name}'s identity confirmation",
      },
      loading: "Loading people...",
      pagination:
        "Showing the first {shown} of {total}. Type part of a name or an email address above to find the others.",
      resetTwoFactor: {
        ariaLabel: "Reset two-step sign-in for {name}",
        cancel: "Cancel",
        confirm:
          "Turn off their two-step sign-in and sign them out everywhere?",
        description: "For someone who lost their phone and their backup codes.",
        reset: "Reset",
        resetting: "Resetting...",
        title: "Reset two-step sign-in",
      },
      role: {
        admin: "Administrator",
        makeAdmin: "Make administrator",
        makeAdminAriaLabel: "Make {name} an administrator",
        member: "Member",
        minimum: "There has to be at least one administrator.",
        removeAdmin: "Remove as administrator",
        removeAdminAriaLabel: "Remove {name} as administrator",
        saving: "Saving...",
      },
      search: {
        ariaLabel: "People",
        label: "Find a person",
        placeholder: "Name or email",
      },
      status: {
        closing: "Closing",
        emailNotConfirmed: "Email not confirmed",
        signingLocked: "Signing locked",
        twoStepOn: "Two-step on",
        you: "You",
      },
      title: "People",
      unlock: {
        ariaLabel: "Unlock signing for {name}",
        title: "Unlock signing",
      },
    },
    security: {
      audit: {
        broken:
          "The hash chain is broken at event {sequence}: a row was changed or removed.",
        chainAriaLabel: "Site audit trail",
        csv: "Download as CSV",
        description:
          "Sign-ins and failed sign-ins, changes to how people sign in, and changes to settings, roles, the logo, identity confirmations and signing locks. Each envelope has its own trail too, which its sender can export from the envelope's page.",
        downloadFiles: {
          auditTrail: "audit trail",
          certificate: "certificate",
          documentAsSent: "document as sent",
          signedPdf: "signed PDF",
        },
        empty: "Nothing recorded yet.",
        eventsPrefix: "events: {events}",
        failedAttempts: "{count} wrong in a row",
        intact: "Hash chain intact across {count} events.",
        refresh: "Refresh",
        sentBy: "sent by {email}",
        failureReasons: {
          accountTemporarilyLocked: "second step locked after wrong codes",
          emailNotVerified: "email address not confirmed yet",
          invalidBackupCode: "wrong backup code",
          invalidCode: "wrong authenticator code",
          invalidEmailOrPassword: "wrong email or password",
          tooManyAttempts: "too many wrong codes, signed out",
        },
        signInMethods: {
          authenticator: "with an authenticator code",
          backupCode: "with a backup code",
        },
        deletion: {
          cancelled: "was due on {date}",
          scheduled: "to be deleted on {date}",
        },
        eventLabels: {
          accountClosureRequested: "Account closure requested",
          accountDeleted: "Account deleted",
          apiKeyCreated: "API key created",
          apiKeyRevoked: "API key revoked",
          emailDomainChanged: "Email domain changed",
          embedOriginAdded: "Site allowed to embed signing",
          embedOriginRemoved: "Site no longer allowed to embed signing",
          envelopeDeleted: "Finished envelope deleted",
          envelopeDeletionCancelled: "Envelope deletion cancelled",
          envelopeDeletionScheduled: "Envelope deletion scheduled",
          envelopeFileDownloaded: "Another member's file downloaded",
          identityVerificationRevoked: "Identity confirmation taken back",
          identityVerified: "Identity confirmed",
          logoChanged: "Logo changed",
          part11ModeChanged: "Part 11 mode changed",
          passwordChanged: "Password changed",
          passwordReset: "Password reset by email link",
          reauthenticationFailed: "Wrong password while signing",
          roleChanged: "Role changed",
          settingsChanged: "Settings changed",
          signInFailed: "Sign-in failed",
          signInLocked: "Sign-in stopped after wrong passwords",
          signInSucceeded: "Signed in",
          sessionsRevoked: "Signed out everywhere",
          signedOut: "Signed out",
          signingLocked: "Signing locked",
          signingUnlocked: "Signing unlocked",
          twoFactorBackupCodesRegenerated: "New backup codes made",
          twoFactorDisabled: "Two-step sign-in turned off",
          twoFactorEnabled: "Two-step sign-in turned on",
          twoFactorRequirementChanged: "Two-step sign-in requirement changed",
          twoFactorReset: "Two-step sign-in reset by an administrator",
          webhookEndpointChanged: "Webhook endpoint changed",
          webhookEndpointCreated: "Webhook endpoint added",
          webhookEndpointDeleted: "Webhook endpoint removed",
        },
        details: {
          account: "Account",
          logoRemoved: "Removed",
          logoReplaced: "Replaced",
          newSecret: "new signing secret",
          ownerNoLongerAdmin: "owner is no longer an administrator",
          roleChange: "{target}: {from} to {to}",
          turnedOff: "turned off",
          turnedOn: "turned on",
          turnedOnShort: "Turned on",
          turnedOffShort: "Turned off",
        },
        title: "Site audit trail",
      },
      description:
        "Two-step sign-in asks for a code from an authenticator app (such as 1Password, Google Authenticator or Microsoft Authenticator) after the password. When you require it, anyone who has not set it up is asked to do so the next time they open the app, and can do nothing else until they have. Ten wrong passwords for one email address stop sign-in for it for 15 minutes either way.",
      durations: {
        day: "1 day",
        days: "{count} days",
        hour: "1 hour",
        hours: "{count} hours",
        minute: "1 minute",
        minutes: "{count} minutes",
      },
      genericError: "Something went wrong. Please try again.",
      required: "Required for everyone",
      optional: "Optional",
      saving: "Saving...",
      sessions: {
        description:
          "How long someone stays signed in. A change applies to everyone who is signed in now, from their next click. Anyone can also sign out everywhere from their own Settings.",
        idleLabel: "Sign out after no use for",
        maxLabel: "Sign out at the latest after",
        never: "Never",
        save: "Save session limits",
        saving: "Saving...",
        title: "Sessions",
        weekDefault: "7 days (the default)",
      },
      stopRequiring: "Stop requiring two-step sign-in",
      require: "Require two-step sign-in",
      success: "Session limits saved.",
      title: "Sign-in security",
    },
    sessions: {
      description:
        "If you signed in on a computer that is not yours, or lost a device, sign out everywhere. Every browser signed in to your account, including this one, has to sign in again.",
      genericError: "Something went wrong. Please try again.",
      signOut: "Sign out everywhere",
      signingOut: "Signing out...",
      title: "Signed-in devices",
    },
    signerData: {
      confirmHelper:
        "Type the email again to confirm erasure. This cannot be undone.",
      confirmLabel: "Confirm erasure",
      description:
        "When a signer asks what you hold about them, download it here. When they ask for it to be erased, you can delete every finished envelope they signed, with its files and audit trail. Signed records are often ones you must keep, so erase only when no law or open dispute requires them.",
      download: "Download their data (JSON)",
      emailLabel: "Signer's email",
      emailPlaceholder: "jane@company.com",
      erase: "Erase this signer's records",
      error: "That request could not be completed.",
      keptPart11:
        " {count} Part 11 record(s) were kept: they are deleted by hand only, once the rules that apply to them allow it.",
      skippedInProgress:
        " {count} envelope(s) still out for signature were left alone: void them first, then erase again.",
      success:
        "Deleted {deleted} finished envelope(s) and removed the signer from {drafts} draft(s).{skipped}{kept}",
      title: "Signer data requests",
    },
    twoFactor: {
      backupCodes: {
        ariaLabel: "Backup codes",
        description:
          "Keep these backup codes somewhere safe, such as your password manager. Each one works once, in place of a code from your app, if you lose your phone. You will not see them again.",
        download: "Download codes",
        fileLine:
          "Each code works once, in place of a code from your authenticator app.",
        fileTitle: "{productName} backup codes",
        new: "New backup codes made. The old ones no longer work.",
      },
      cancel: "Cancel",
      confirm: {
        continue: "Continue",
        newCodes: "Make new codes",
        off: "Turn off",
      },
      description:
        "After your password, {productName} asks for a 6-digit code from an authenticator app on your phone, such as 1Password, Google Authenticator or Microsoft Authenticator. Someone who learns your password still cannot sign in.",
      descriptionRequired: " Your organization requires it.",
      done: "Done",
      errors: {
        generic: "Something went wrong. Please try again.",
        invalidCode:
          "That code is not right. Check the time on your phone and try the newest code.",
        invalidPassword: "That password is not right.",
        passwordRequired: "Enter your password.",
        totpRequired: "Enter the 6-digit code your app shows.",
      },
      makeNewCodes: "Make new backup codes",
      setUp: "Set up two-step sign-in",
      off: "Off",
      on: "On",
      passwordLabel: "Your password",
      qrAriaLabel: "QR code for your authenticator app",
      scan: {
        manual: "Or type in this key:",
        step: "Scan this code with your authenticator app.",
      },
      status: {
        off: "Turn off two-step sign-in",
        on: "Turn on two-step sign-in",
      },
      steps: {
        backupCodes: "Save your backup codes",
        code: "Enter the code your app shows",
      },
      title: "Two-step sign-in",
      totpLabel: "6-digit code",
    },
    updates: {
      check: "Check for updates",
      checking: "Checking...",
      checkError: "Updates could not be checked. Please try again.",
      docs: {
        beforeTheLink: "The",
        createFile: "Create the file",
        details: "has the details.",
        guideLink: "update guide",
        inRepository: "in your repository once and paste in",
        itsContents: "its contents",
        newReleaseAfter:
          " shows how, including a GitHub workflow that does it for you.",
        newReleaseBefore:
          "Bring the new release into the repository this site is built from, then deploy it. The ",
        noWorkflow:
          "No such workflow? Copies made before version 0.2.0 do not have it.",
      },
      errorSuffix: " ",
      eyebrow: "Administrator",
      howTo: {
        merge:
          "Merge the pull request. Vercel deploys it, and the build applies any database changes the new version needs.",
        pullRequest:
          "It opens a pull request with the new version, and Vercel builds a preview of it. Your own changes to the code are kept; if they clash with the update, the workflow says which files.",
        runWorkflowAfter: ". It also runs by itself once a week.",
        runWorkflowBefore: "In your repository ",
        runWorkflowButton: "Run workflow",
        runWorkflowMiddle: ", open the Update Sakta workflow and press ",
        title: "How to update",
      },
      latest: " is out. This site runs {current}.",
      openWorkflow: "Open the update workflow",
      releaseLink: "Read the release on GitHub",
      releasesLink: "See the releases",
      upToDate: "You are up to date. {version} is the latest release.",
      versionAfter: "). New versions are published on ",
      versionBefore: "This site runs Sakta version ",
      versionBetween: " (commit ",
      whatsNew: "What's new",
    },
    webhooks: {
      add: "Add endpoint",
      adding: "Adding...",
      cancel: "Cancel",
      copy: "Copy",
      copied: "Copied",
      descriptionAfter:
        " way. Endpoints get events for every envelope on this install. If the app does not answer, the event is tried again for about two days.",
      descriptionBefore:
        "Tell another app when an envelope is sent, opened, signed, completed, declined, voided or expires. Each event is POSTed to the URL as JSON and signed with the endpoint's secret, the ",
      docsLink: "Standard Webhooks",
      done: "Done",
      empty: "No endpoints yet.",
      events: { legend: "Events" },
      fields: {
        descriptionLabel: "Description (optional)",
        descriptionPlaceholder: "What this endpoint is for",
        urlLabel: "URL",
        urlPlaceholder: "https://app.example.com/webhooks/signudoc",
      },
      genericError: "Something went wrong. Please try again.",
      log: {
        answered: ", answered {status}",
        attempts: ", {count} tries",
        ariaLabel: "Recent deliveries",
        empty: "Nothing sent yet.",
        loading: "Loading...",
        hide: "Hide log",
        lastError: "{error}",
        nextTry: " Next try around {date}.",
        noAnswer: "no answer",
        paused:
          "This endpoint is off, so nothing is sent to it. Deliveries that are waiting go out once it is turned on.",
        refreshed: "The test event was delivered (answered {status}).",
        refresh: "Refresh",
        resend: "Send again",
        sending: "Sending...",
        statuses: {
          delivered: "Delivered",
          failed: "Failed",
          pending: "Waiting",
          retrying: "Retrying",
        },
        testFailed: "The test event was not delivered: {error}.",
        title: "Delivery log",
      },
      newSecretNotice:
        "Copy the signing secret for {url} now. It is not shown again. Press Done once it is copied, before adding another endpoint or making another secret.",
      off: "Off",
      on: "On",
      remove: "Remove",
      removeAriaLabel: "Remove {url}",
      removeConfirm: "Remove this endpoint and its delivery log?",
      removing: "Removing...",
      retry: "Try again",
      rotate: "New secret",
      secretTransition:
        " The old secret also signs until {date}, and another new secret can be made after that.",
      status: {
        allEvents: "All events.",
        events: "{events}.",
      },
      test: { send: "Send test", working: "Working..." },
      title: "Webhooks",
      toggle: { off: "Turn off", on: "Turn on" },
      eventLabels: {
        completed: "Completed",
        declined: "Declined",
        expired: "Expired",
        sent: "Sent",
        signerSigned: "Signer signed",
        signerViewed: "Signer opened it",
        voided: "Voided",
      },
      listAriaLabel: "Webhook endpoints",
    },
  },
  shell: {
    accountMenuAriaLabel: "Account menu for {name}",
    emailNotice: {
      action: "Finish email setup",
      description:
        "Until it is, signers and new users will not receive messages from this site.",
      title: "Email is not set up yet.",
    },
    nav: {
      documents: "Documents",
      newEnvelope: "New envelope",
      settings: "Settings",
      templates: "Templates",
    },
    sessionMenu: {
      dashboard: "Dashboard",
      logOut: "Log out",
      openAriaLabel: "Open account menu",
      signingOut: "Signing out...",
    },
    settingsLink: "Settings",
    signOut: "Sign out",
    signingOut: "Signing out...",
    twoStepSetup: {
      description:
        "Your organization requires two-step sign-in on {productName}. Set it up for {email} to continue. It takes about a minute with an authenticator app on your phone.",
      eyebrow: "One more step",
      signOut: "Sign out",
    },
    workspaceAriaLabel: "Workspace",
  },
  envelope: {
    steps: ["Upload", "Signers", "Place fields", "Review"],
    prepare: {
      actions: {
        addRadioButton: "+ Add a button to this group",
        back: "Back",
        closeFieldTools: "Close field tools",
        delete: "Delete",
        done: "Done",
        next: "Next →",
        openFieldTools: "Open field tools",
        place: "Place",
        placing: "Placing",
        retry: "Retry",
      },
      choiceProblems: {
        dropdown_options:
          "A dropdown for {signer} needs at least two choices. Select it and add them.",
        radio_group_size:
          "A radio button for {signer} is on its own. Add another button to its group, or remove it.",
      },
      error: {
        generic: "Something went wrong. Please try again.",
        loadDescription: "Something went wrong. Please try again.",
        loadTitle: "Couldn't load this document",
        saveNetwork: "Your changes could not be saved. Try again.",
      },
      fallbackSignerName: "a signer",
      fieldSettings: {
        ariaLabel: "Field settings",
        assignedTo: "Assigned to",
        choices: "Choices",
        choicesPlaceholder: "Yes\nNo\nNot sure",
        choicesReady:
          "One choice per line. {count} of up to {max}. The signer picks one.",
        choicesTooFew: "One choice per line. Add at least two.",
        optional: "Optional",
        radioMeaning: "What this button means",
        radioPlaceholder: "Yes",
        radioReady: "{count} buttons in this group. The signer picks one.",
        radioTooFew: "A radio button needs at least one more in its group.",
        required: "Required",
        requiredGroup: "Required (whole group)",
        title: "Field settings",
      },
      fieldTools: {
        checkbox: { label: "Checkbox", placeholderLabel: "Checkbox" },
        date: { label: "Date", placeholderLabel: "Date" },
        dropdown: { label: "Dropdown", placeholderLabel: "Dropdown" },
        initials: { label: "Initials", placeholderLabel: "Initials" },
        name: { label: "Name", placeholderLabel: "Name" },
        number: { label: "Number", placeholderLabel: "Number" },
        radio: { label: "Radio button", placeholderLabel: "Radio button" },
        signature: { label: "Signature", placeholderLabel: "Sign" },
        text: { label: "Text", placeholderLabel: "Text" },
      },
      fields: {
        emptyDescription:
          "Pick a field, then click the page to place it for the selected signer.",
        emptyTitle: "No fields placed yet",
        placedMany: "{count} fields placed",
        placedOne: "1 field placed",
        title: "Fields",
      },
      inspector: {
        emptyHint:
          "Select a field on the page to edit its settings, or choose a field tool on the left to place a new one.",
        noField: "No field selected",
        placeHint: "Click the document to place {field} for {signer}.",
        title: "Inspector",
        toolReady: "{field} ready to place",
      },
      optionLabel: "Option {number}",
      page: {
        ariaDocument: "Document page",
        ariaNext: "Next page",
        ariaPrevious: "Previous page",
        label: "Page {page} of {count}",
      },
      placedRadioLabel: "Radio button: {label}",
      placement: {
        ariaPlace: "Place {field} on page {page}",
        clickFor: "for",
        clickPrefix: "Click the page to place",
        ready: "Ready to place",
        srPlace: "Place {field} on the document page",
      },
      save: {
        failed: "Save failed",
        saved: "Saved",
        saving: "Saving...",
      },
      signerPanel: {
        newFieldsHere: "New fields will be assigned here",
        placing: "Placing {field}",
        title: "Selected signer",
      },
      signers: {
        fieldsMany: "{count} fields placed",
        fieldsOne: "1 field placed",
        signatureNeeded: "Signature needed",
        signatureReady: "Signature ready",
        title: "Signers",
      },
      step: "Step 3 of 4",
      title: '"Document"',
      toolSheet: {
        ariaLabel: "Field tools",
        title: "Fields",
      },
    },
    reminderIntervals: {
      everyDays: "Every {days} days",
      everyDay: "Every day",
      everyWeek: "Every week",
      off: "Off",
    },
    review: {
      actions: {
        back: "← Back",
        cancel: "Cancel",
        send: "Send envelope",
        sending: "Sending...",
        sendNow: "Send now",
      },
      dialog: {
        notifiedFirst:
          "The first signer ({name}) will be notified immediately.",
        notifiedImmediate: "{name} will be notified immediately.",
        notifiedParallel:
          "{name} will be notified immediately, to sign at the same time.",
        permittedUseAfter: ".",
        permittedUseBefore:
          "By sending, you confirm this document is an ordinary business agreement and not a will, court order, legally required consumer disclosure, or other ",
        permittedUseLink: "document that cannot be signed electronically",
        signatureType:
          "Signature type: {type}. It cannot be changed once the envelope is sent.",
        signerOne: "signer",
        signers: "signers",
        summary:
          "“{title}” will be sent to {signerCount} {signerLabel}. {firstSignerNotice} The request expires in {deadlineDays} days.",
        title: "Send this envelope?",
      },
      document: {
        eyebrow: "Document",
        meta: "{filename} - {pageCount} - {sizeLabel}",
        page: "{count} pages",
        pageOne: "1 page",
      },
      empty: {
        action: "Back to prepare",
        description:
          "Add signers and place fields before you review the final summary for this envelope.",
        eyebrow: "Incomplete draft",
        title: "Nothing to review yet",
      },
      error: {
        description:
          "We couldn't load this draft summary. Try again after checking the earlier steps.",
        retry: "Retry",
        sendFailed: "Failed to send. Please try again.",
        title: "Couldn't load the review summary",
      },
      fields: {
        countMany: "({count} fields)",
        countOne: "({count} field)",
        none: "No fields placed yet (0 fields)",
      },
      header: {
        description: "Step 4 of 4 - Review and send",
        title: "New envelope",
      },
      notice: {
        opening: "Opening the envelope detail view...",
        sent: "Envelope sent. {name} has been notified.",
      },
      settings: {
        deadline: "Signing deadline",
        deadlineOption: "{days} days",
        explanation:
          "Signing links stop working at the deadline. Reminders go to the signer whose turn it is until they sign. You can change both later from the envelope.",
        reminders: "Automatic reminders",
        signatureType: "Signature type",
      },
      signature: {
        advanced: "Advanced electronic signatures through {providerName}",
        parallelBlocked:
          "These signatures are added one after another, so signers cannot sign at the same time. Give each signer their own step, or choose Sakta signatures.",
        providerDescription:
          "Each signer proves who they are at {providerName} and signs with a certificate in their own name. {qualifiedNote}Which type a document needs is a legal question; this is not legal advice.",
        qualified: "Qualified electronic signatures through {providerName}",
        qualifiedNote:
          "A qualified signature needs a qualified certificate, which not every signer has. ",
        simple: "Sakta signatures",
        simpleDescription:
          "Signers sign here, and the finished PDF is sealed by this install.",
      },
      signingOrder: {
        copies: "Copies when everyone has signed",
        parallel:
          "After you send, everyone numbered 1 receives an email with a link to sign. Signers with the same number sign at the same time, and the next number is invited once they have all signed.",
        sequential:
          "After you send, Signer 1 will receive an email with a link to sign. Each signer is notified in order after the previous signer completes.",
        signer: "Signer {order}",
        signers: "{count} signers",
        signerOne: "{count} signer",
        title: "Signing order",
      },
    },
    signers: {
      actions: {
        addCopy: "+ Add a copy recipient",
        addSigner: "+ Add another signer",
        back: "← Back",
        maximumReached: "Maximum reached",
        next: "Next →",
        remove: "Remove",
      },
      checks: {
        accessCode: {
          hint: " (a code is set; type a new one to change it)",
          label:
            "Access code you will give them yourself, for example by phone",
          placeholder: "At least 4 characters",
          placeholderSaved: "••••••",
        },
        bothNotice:
          "This signer has both an emailed code and an access code, so they must pass both. Picking one option below removes the other.",
        description:
          "By default anyone holding the emailed link can sign. Pick a check when the signer's identity matters.",
        legend: "Extra check before signing",
        options: {
          accessCode: "Ask for an access code you give them yourself",
          emailCode: "Email them a one-time code when they open the link",
          none: "No extra check",
        },
        optional: "(optional)",
        title: "Extra check before signing",
      },
      copyIntro: {
        description:
          "These people do not sign. They receive the finished document and its certificate once everyone has signed.",
        optional: "(optional)",
        title: "Send a copy to",
      },
      copyRecipient: {
        aria: {
          email: "Copy recipient {position} email",
          name: "Copy recipient {position} name",
          remove: "Remove copy recipient {position}",
        },
        emailPlaceholder: "alex@company.com",
        label: "Copy {position}",
        namePlaceholder: "Alex Jones",
      },
      error: {
        description:
          "We couldn't load this draft's signer list. Try again and confirm the upload step completed successfully.",
        retry: "Retry",
        title: "Couldn't load signer setup",
      },
      fields: {
        email: "Email",
        name: "Name",
      },
      header: {
        description: "Step 2 of 4 - Add signers",
        title: "New envelope",
      },
      intro: {
        limit: "Up to {maxSigners} signers per document.",
        parallel:
          "Signers who sign at the same time are invited together, and the next signer is invited once they have all signed.",
        part11: "In Part 11 mode each signer signs after the one before.",
        title: "Signers will receive the document in this order.",
      },
      route: {
        finishPlural: "finish",
        finishSingular: "finishes",
        firstImmediate: "Receives the invitation immediately after send.",
        firstParallel:
          "Receives the invitation immediately after send, and signs at the same time as the others in step 1.",
        parallel:
          "Signs at the same time as {previous}, once {previous} {finishVerb}.",
        sequential: "Receives the document after {previous} {finishVerb}.",
      },
      signatureMeaning: {
        choose: "Choose a meaning",
        description:
          "Part 11 mode is on. The meaning is printed beside the signature with the signer's name and the time. The signer needs an account here with a confirmed email address, and an administrator must have confirmed who they are.",
        options: {
          approval: {
            label: "Approval",
            statement: "I approve this document.",
          },
          authorship: {
            label: "Authorship",
            statement: "I am the author of this document.",
          },
          responsibility: {
            label: "Responsibility",
            statement: "I take responsibility for this document.",
          },
          review: {
            label: "Review",
            statement: "I have reviewed this document.",
          },
        },
        title: "What this signature means",
      },
      signer: {
        aria: {
          accessCode: "Signer {order} access code",
          check: "Signer {order} check: {label}",
          email: "Signer {order} email",
          meaning: "Signer {order} signature meaning",
          moveEarlier: "Move signer {order} earlier",
          moveLater: "Move signer {order} later",
          name: "Signer {order} name",
          remove: "Remove signer {order}",
        },
        label: "Signer {order}",
        moveEarlier: "Earlier",
        moveLater: "Later",
        step: " · Step {step}",
        stepLabelMany: "Signers {orders}",
        stepLabelOne: "Signer {order}",
        together: "Sign at the same time as Signer {order}",
      },
      validation: {
        accessCodeLength: "Use 4 to 64 characters",
        accessCodeRequired: "Type the code you will give them",
        duplicateCopy: "This address is already a signer or a copy recipient.",
        duplicateSigner: "Each signer must have a unique email address.",
        emailInvalid: "Enter a valid email address",
        generic: "Something went wrong. Please try again.",
        nameRequired: "Name is required",
      },
    },
    detail: {
      actions: {
        cancel: "Cancel",
        cancelDeletion: "Cancel deletion",
        change: "Change",
        continueEditing: "Continue editing",
        copyToDraft: "Copy to new draft",
        deleteDraft: "Delete draft",
        deleteEnvelope: "Delete envelope",
        downloadCertificate: "Download certificate",
        downloadSignedPdf: "Download signed PDF",
        exportAudit: "Export audit trail",
        save: "Save",
        saveTemplate: "Save as template",
        saving: "Saving...",
        sendReminder: "Send reminder",
        viewDocument: "View document",
        viewTemplates: "View templates",
        voidEnvelope: "Void envelope",
      },
      back: {
        all: "← All envelopes",
        own: "← Documents",
      },
      copyRecipients: {
        completed: "Sent the finished document and its certificate.",
        pending: "Gets the finished document once everyone has signed.",
        title: "Receives a copy",
      },
      created: "Created {date}",
      deadline: {
        change: "Change deadline",
        changeReminders: "Change reminders",
        expired:
          "Expired {date}. Nobody can sign until you set a new deadline.",
        expires: "Expires {date}.",
        noDeadline: "No deadline. Each signing link lasts seven days.",
        reminderCooldown: "You can send another reminder after {date}.",
        remindersOff: "Automatic reminders are off.",
        remindersOn: "Automatic reminders: {interval}.",
        setNew: "Set a new deadline",
      },
      deletion: {
        askedByAdmin:
          "{email} asked for it. Any administrator can cancel until then.",
        askedByOther:
          "An administrator ({email}) asked for it. Download the signed PDF and the certificate before then if you need to keep them.",
        reason: "Reason: {reason}",
        scheduled: "Scheduled to be deleted on {date}",
      },
      dialogs: {
        cancelDeletion: {
          confirm: "Cancel deletion",
          description: [
            "The envelope stays as it is and will not be deleted.",
            "If its sender was told it would be deleted, they are told it will not.",
          ],
          title: "Cancel this deletion?",
        },
        copy: {
          body: [
            "This starts a new draft with the same document, the same people and the same fields. Nothing that was filled in is copied.",
            "Access codes are not copied: they are stored hashed, so they cannot be brought across. You can set new ones before sending.",
            "Nobody is emailed, and this envelope is left as it is.",
          ],
          confirm: "Copy to new draft",
          copying: "Copying...",
          title: "Copy to a new draft",
        },
        deadline: {
          activeHint:
            "The signing link that was already sent keeps working until then.",
          expiredHint:
            "The signing link that was already sent will work again.",
          explanation: "The new deadline counts from now.",
          label: "Signing deadline",
          option: "{days} days from now",
          save: "Save deadline",
          title: "Change the deadline",
          titleExpired: "Set a new deadline",
        },
        deleteDraft: {
          confirm: "Delete draft",
          description: [
            "This draft has not been sent yet.",
            "Deleting it will permanently remove the draft and its placed fields.",
          ],
          title: "Delete this draft?",
        },
        deleteFinished: {
          confirm: "Schedule deletion",
          description: [
            "The envelope, its signed PDF, its certificate and its audit trail will be deleted for good in 14 days. Download links already sent to signers will stop working then.",
            "Its sender is emailed now, with a link to download what they need to keep.",
            "Until then any administrator can cancel. The install's audit log records the request, and the deletion with the document's fingerprints.",
          ],
          title: "Schedule this envelope for deletion?",
        },
        reason: {
          auditEnvelope: "Kept in the envelope's audit trail.",
          auditInstall: "Kept in the install's audit log.",
          optional: "Reason (optional)",
          required: "Reason (required)",
        },
        reminders: {
          description:
            "A reminder goes to the signer whose turn it is when they have not heard from you for this long. Reminders stop once everyone has signed or the deadline passes.",
          label: "Send a reminder",
          save: "Save reminders",
          title: "Automatic reminders",
        },
        signer: {
          description:
            "The signing link already sent to this person will stop working. If it is their turn, a new invitation goes to the corrected address.",
          email: "Email",
          name: "Name",
          title: "Correct this signer",
        },
        void: {
          confirm: "Void envelope",
          description: [
            "This will cancel the signing process.",
            "Signers who were sent the envelope, including those who already signed, will be told it was voided.",
            "This action cannot be undone.",
          ],
          title: "Void this envelope?",
        },
      },
      error: {
        backToDocuments: "Back to documents",
        cancelDeletion: "Unable to cancel this deletion.",
        cancelDeletionNetwork:
          "Could not reach the server. Reload the page to see whether the deletion was cancelled.",
        copy: "Unable to copy this envelope.",
        correctSigner: "Unable to correct this signer.",
        deadline: "Unable to change the deadline.",
        deleteDraft: "Unable to delete this draft.",
        load: "Couldn't load this envelope",
        loadDescription: "Couldn't load this envelope. Please try again.",
        notFound: "This envelope is unavailable",
        notFoundDescription:
          "We couldn't find this envelope, or you no longer have access to it.",
        notFoundEyebrow: "Unavailable",
        nudge: "Unable to send a reminder right now.",
        reminders: "Unable to change the reminders.",
        retry: "Retry",
        scheduleDeletion: "Unable to schedule this envelope's deletion.",
        scheduleDeletionNetwork:
          "Could not reach the server. Reload the page to see whether the deletion was scheduled.",
        void: "Unable to void this envelope.",
      },
      savedTemplate: "Saved as the template “{name}”.",
      sentBy: "Sent by {name}",
      signers: {
        title: "Signers",
        total: "{count} total",
      },
      status: {
        envelope: {
          completed: "Completed",
          declined: "Declined",
          draft: "Draft",
          sent: "Sent",
          voided: "Voided",
        },
        expired: "Expired",
        signer: {
          declined: "Declined",
          pending: "Pending",
          signed: "Signed",
          waiting: "Waiting",
        },
      },
      templatePrompt:
        "Send this kind of document often? Keep its fields and signing order as a template.",
      timeline: {
        events: "{count} events",
        title: "Timeline",
      },
      viewDocumentAria: "View {title} (opens in a new tab)",
    },
    upload: {
      action: {
        fromTemplate: "Start from a template",
        next: "Next →",
        remove: "Remove",
      },
      dropzone: {
        ariaLabel: "Document upload dropzone",
        browse: "click to browse",
        constraint: "PDF only - 20 MB max",
        drag: "Drag and drop your PDF here",
        or: "or",
        progressAriaLabel: "Upload progress",
        uploading: "Uploading...",
        validating: "Validating the PDF before you continue to signer setup.",
      },
      error: {
        generic: "Something went wrong. Please try again.",
        invalidType: "Only PDF files are supported. Please upload a valid PDF.",
        locked:
          "This PDF is password-protected or encrypted. Please upload an unlocked PDF.",
        previewUnavailable:
          "We couldn't render this PDF in the editor. Please export it as a standard PDF and try again.",
        tooLarge: "This file exceeds the 20 MB limit.",
      },
      fileInputAriaLabel: "Upload PDF",
      header: {
        description: "Step 1 of 4 - Upload document",
        title: "New envelope",
      },
      title: {
        label: "Envelope title",
        placeholder: "e.g., NDA - Client Bravo",
      },
    },
    placedField: {
      ariaLabel: "{name} · {label}",
      corners: {
        bottomLeft: "bottom left",
        bottomRight: "bottom right",
        topLeft: "top left",
        topRight: "top right",
      },
      resizeAriaLabel: "Resize {label} field from {corner}",
    },
    pdfPage: {
      ariaLabel: "Rendered PDF page {page}",
      error: {
        description: "Reload the page or try this draft again in a moment.",
        title: "We couldn't render this PDF page.",
      },
      loading: {
        description:
          "Preparing the source PDF so placed fields stay aligned with the stored page size.",
        title: "Rendering document page...",
      },
    },
  },
  footer: {
    accessibilityLong: "Accessibility Statement",
    accessibilityShort: "Accessibility",
    ariaLabel: "Footer",
    contact: "Contact",
    english: "English",
    indonesian: "Bahasa Indonesia",
    languageAriaLabel: "Choose a language",
    permittedUseLong: "What this is for",
    permittedUseShort: "E-signatures",
    poweredBy: "Powered by {productName}",
    privacyLong: "Privacy Policy",
    privacyNotice: "Privacy notice",
    privacyShort: "Privacy",
    termsLong: "Terms of Service",
    termsShort: "Terms",
  },
  landing: {
    actions: {
      goToDashboard: "Go to dashboard",
      logIn: "Log in",
      startFree: "Start free",
    },
    closing: {
      body: "No credit card. No per-envelope fees. Just upload and send.",
      note: "Free • no signer account required • up to 25 signers per document",
      title: "Send your next agreement. On us.",
    },
    comparison: {
      feature: "Feature",
      included: "Included",
      notIncluded: "Not included",
      perSeatPlans: "Per-seat plans",
      rows: {
        envelopes: {
          feature: "Envelopes per month",
          perSeat: "Capped by plan",
          signudoc: "Unlimited",
        },
        price: {
          feature: "Price",
          perSeat: "Per user, every month",
          signudoc: "Free forever",
        },
        reminders: {
          feature: "Reminders",
          perSeat: "Higher plans only",
        },
        signers: {
          feature: "Signers per document",
          perSeat: "Varies by plan",
          signudoc: "Up to 25",
        },
      },
    },
    faq: {
      items: [
        {
          answer:
            "Nope. You sign in to send documents, but your signers just click a link and sign. No account, no friction.",
          question: "Do signers need a Sakta account?",
        },
        {
          answer:
            "Signature, initials, date, text, and checkbox. Everything most documents need.",
          question: "What field types can I place on a document?",
        },
        {
          answer:
            "Yes. Hit the remind button and they get a nudge. No need to resend the whole document.",
          question: "Can I remind a signer if they are taking too long?",
        },
        {
          answer:
            "You get the final signed PDF plus a tamper-proof certificate. Download both in one click.",
          question: "What do I get when everyone finishes signing?",
        },
      ],
      marker: "FAQ",
      title: "Quick answers.",
    },
    hero: {
      headline: "Sign PDFs Online for Free.",
      headlineAccent: "No catch.",
      lead: "Upload a PDF, drop in signature fields, and send. That's it.",
      marker: "Free e-signature software",
      seeHowItWorks: "See how it works",
    },
    metadata: {
      description:
        "Free e-signature software for small businesses. Upload, send, sign — no enterprise circus required.",
    },
    nav: {
      ariaLabel: "Public navigation",
    },
    pricing: {
      allPlans: "See all plans",
      lead: "Everything below is included. Forever. For $0. See how that stacks up against a typical per-seat e-signature plan.",
      marker: "Pricing",
      signersNote: "Your signers never need to create an account.",
      title: "Free beats $120 a year.",
    },
    security: {
      lead: "Every PDF is encrypted, every action is logged, and every signing link is cryptographically secured. The code is open source so you can verify it yourself.",
      marker: "Security",
      pillars: [
        {
          body: "Documents are kept in private, encrypted storage. All connections use HTTPS with HSTS enforcement.",
          title: "Encrypted at rest and in transit",
        },
        {
          body: "Every view, signature, and decline is logged with timestamps and IP addresses. Download the certificate PDF as proof.",
          title: "Complete audit trail",
        },
        {
          body: "Each signer gets a unique cryptographic token. Links expire at the deadline the sender sets and can't be guessed or reused.",
          title: "Secure signing links",
        },
        {
          body: "The entire codebase is public. Inspect the security model, audit the logic, or self-host on your own infrastructure.",
          title: "Open source",
        },
      ],
      title: "Your documents stay safe.",
    },
    workflow: {
      lead: "Upload a PDF, set the signing order, place fields, and hit send. Your signers don't even need an account.",
      marker: "How it works",
      steps: [
        {
          body: "Bring the contract you already wrote. No template rebuilding.",
          title: "Upload your PDF",
        },
        {
          body: "Pick who signs first, second, third. Each person gets invited after the last one finishes.",
          title: "Add signers",
        },
        {
          body: "Drop signature, initials, date, text, and checkbox fields onto the page.",
          title: "Place fields",
        },
        {
          body: "Fire off a signing link. Nudge the slow ones. Download the final PDF.",
          title: "Send and track",
        },
      ],
      title: "Four steps. One signed document.",
    },
  },
  pricingPage: {
    bottom: {
      body: "Sakta is open source under MIT. Run it on your own infrastructure, or ask us for a dedicated hosted instance.",
      cta: "Talk to us",
      title: "Need your own installation?",
    },
    cards: {
      business: {
        cta: "Contact us",
        footnote: "Invoices with NPWP available.",
        name: "Business",
        tagline: "For companies that need to connect systems.",
      },
      free: {
        cta: "Start free",
        footnote: "No credit card. No expiry.",
        name: "Free",
        tagline: "For trying the whole signing loop.",
      },
      standard: {
        cta: "Start free",
        footnote: "Billed yearly, cancel anytime.",
        name: "Standard",
        tagline: "For small teams that sign every week.",
      },
    },
    comparison: {
      feature: "Feature",
      lead: "Every plan signs PDFs, records consent and seals the result. Higher plans add the tools a growing team needs.",
      rows: [
        {
          business: "Unlimited",
          free: "Unlimited",
          label: "Documents per month",
          standard: "Unlimited",
        },
        {
          business: "Up to 25",
          free: "Up to 25",
          label: "Signers per document",
          standard: "Up to 25",
        },
        {
          business: "Included",
          free: "Included",
          label: "Signing without an account",
          standard: "Included",
        },
        {
          business: "Included",
          free: "Included",
          label: "Signing order and copy recipients",
          standard: "Included",
        },
        {
          business: "Included",
          free: "Included",
          label: "Audit trail, sealed PDF and certificate",
          standard: "Included",
        },
        {
          business: "Included",
          free: "Included",
          label: "Public Verify page",
          standard: "Included",
        },
        {
          business: "Included",
          free: "Not included",
          label: "Reusable templates",
          standard: "Included",
        },
        {
          business: "Included",
          free: "Not included",
          label: "Deadlines and automatic reminders",
          standard: "Included",
        },
        {
          business: "Included",
          free: "Not included",
          label: "Your own logo and brand color",
          standard: "Included",
        },
        {
          business: "Included",
          free: "Not included",
          label: "Access codes and emailed one-time codes",
          standard: "Included",
        },
        {
          business: "Included",
          free: "Not included",
          label: "Bulk send from a CSV",
          standard: "Not included",
        },
        {
          business: "Included",
          free: "Not included",
          label: "API, webhooks and embedded signing",
          standard: "Not included",
        },
        {
          business: "Included",
          free: "Not included",
          label: "Single sign-on (OpenID Connect)",
          standard: "Not included",
        },
        {
          business: "Priority email",
          free: "GitHub issues",
          label: "Support",
          standard: "Email",
        },
      ],
      title: "Compare every plan",
    },
    cycle: {
      annual: "Yearly",
      free: "Free forever",
      label: "Billing period",
      monthly: "Monthly",
      perMonth: "per month",
      perUser: "per user",
      perYear: "per year",
      save: "Save 2 months",
    },
    featured: "Most popular",
    hero: {
      eyebrow: "Pricing",
      lead: "The same signing loop the big platforms sell per seat, at a fraction of the price. No envelope allowance and no surprise fees.",
      note: "Prices in Indonesian rupiah. Yearly plans include two months free.",
      title: "Every signature, at a price that makes sense here.",
    },
    included: "Included",
    metadata: {
      description:
        "Simple, transparent e-signature pricing for Indonesian teams. Start free, then pay only for the seats you need.",
      title: "Pricing | Sakta",
    },
    notIncluded: "Not included",
  },
  email: {
    legalFooter: {
      contact: "Contact",
      privacyNotice: "Privacy notice",
      privacyPolicy: "Privacy Policy",
      questions: "Questions? Contact {supportAddress}.",
      sentBy: "Sent using {productName}.",
      sentByOrganization: "Sent by {organizationName} using {productName}.",
      terms: "Terms of Service",
    },
    completedSender: {
      body: '"{title}" has been fully signed in {productName}.',
      cta: "Review the completed envelope",
      dashboard:
        "The final signed PDF and certificate are ready in your dashboard.",
      greeting: "Hi {senderName},",
      subject: '"{title}" is fully signed',
    },
    completedSigner: {
      attached:
        "The completed document and its certificate are attached. Keep them: they are your copy of the agreement.",
      body: '"{title}" from {senderName} has been fully signed in {productName}.',
      certificate: "Redacted certificate: {url}",
      copyOnly: "{senderName} asked for you to receive a copy.",
      downloadCertificate: "Download redacted certificate",
      downloadSigned: "Download signed PDF",
      greeting: "Hi {signerName},",
      htmlLinksIntro:
        "Download links are available for {days} days. An expired link offers to send a new one.",
      linksIntro:
        "Download links (available for {days} days; an expired link offers to send a new one):",
      ready: "The completed document and its certificate are ready.",
      signedPdf: "Signed PDF: {url}",
      subject: '"{title}" is fully signed',
    },
    declinedSender: {
      body: '{signerName} ({signerEmail}) declined "{title}" in {productName}.',
      cta: "Review the envelope",
      greeting: "Hi {senderName},",
      reason: "Reason provided: {reason}",
      subject: '"{title}" was declined by {signerName}',
    },
    downloadLinks: {
      certificate: "Certificate: {url}",
      ctaCertificate: "Download certificate",
      ctaSigned: "Download signed PDF",
      greeting: "Hi {signerName},",
      intro:
        'Here are new download links for "{title}" in {productName}. They work for {days} days.',
      keep: "Download and keep the files: they are your copy of the record.",
      signedPdf: "Signed PDF: {url}",
      subject: 'New download links for "{title}"',
    },
    reminder: {
      introAutomatic:
        '{senderName} is still waiting for your signature on "{envelopeTitle}", sent through {productName}.',
      introManual:
        '{senderName} sent you a reminder to sign "{envelopeTitle}" through {productName}.',
      subjectAutomatic:
        'Reminder: {senderName} is waiting for your signature on "{envelopeTitle}"',
      subjectManual:
        '{senderName} sent you a reminder to sign "{envelopeTitle}"',
    },
    signingInvitation: {
      cta: "Review and sign the document",
      deadline: "This request expires on {deadline}.",
      greeting: "Hi {signerName},",
      newestLink:
        "If you receive a newer invitation or reminder link, use the newest one.",
      noAccount: "You do not need a {productName} account to sign.",
      sent: '{senderName} sent you "{envelopeTitle}" through {productName}.',
      subject: '{senderName} requested your signature on "{envelopeTitle}"',
    },
    signingCode: {
      body: 'Your code to open "{title}" in {productName} is:',
      greeting: "Hi {signerName},",
      subject: 'Your code for "{title}"',
      validity:
        "It works for {minutes} minutes. If you did not just open a signing link, ignore this email.",
    },
    voidNotification: {
      body: '{senderName} voided "{title}" in {productName}.',
      greeting: "Hi {signerName},",
      outcomeSigned:
        "The signing process has been canceled, so the document you signed will not be completed. No further action is needed.",
      outcomeUnsigned:
        "The signing process has been canceled. No further action is needed.",
      subject: '"{title}" was voided by {senderName}',
    },
  },
  done: {
    closeTab: "You can close this tab.",
    emailNotice:
      "You'll receive an email with the signed document once all parties have signed.",
    fallbackTitle: "this document",
    recorded: 'Your signature has been recorded for "{title}".',
    title: "You're all done.",
  },
  verify: {
    form: {
      choose: "Choose a signed PDF or audit certificate",
      checkError: "The file could not be checked right now.",
      checking: "Checking {fileName}...",
      fileLabel: "PDF to verify",
      finishedAt: " on {date} UTC",
      matchBody:
        "The envelope was {status}{finishedAt} with {signerCount} {signers}. Envelope ID {envelopeId}.",
      matchTitle:
        'This file is unchanged. It is the {fileKind} this site produced for "{title}".',
      noMatchBody:
        "This site did not produce this exact file. It may have been changed, saved again by another program, or come from somewhere else. Ask the sender for the copy kept on this site.",
      noMatchTitle: "No match.",
      privacy:
        "The file stays on your device. Only its SHA-256 fingerprint is sent.",
      readError: "The file could not be read.",
      signersMany: "signers",
      signersOne: "signer",
      statuses: {
        completed: "completed",
        declined: "declined",
        voided: "voided",
      },
      types: {
        certificate: "audit certificate",
        signedDocument: "signed document",
      },
    },
    metadata: {
      description:
        "Check that a signed PDF or audit certificate is exactly the file this site produced.",
      title: "Verify a document",
    },
    page: {
      description:
        "Check that a signed PDF or audit certificate is exactly the file this site produced when signing finished. Any change to the file, however small, gives a different fingerprint.",
      sealBody:
        "Finished documents and certificates also carry a digital seal. Open the file in Adobe Acrobat Reader or another PDF reader and look at its signature panel. The reader says whether the document has been changed since it was sealed. Unless the organization has installed a certificate from a certificate authority, the reader will also say the signer's identity is unknown; that is expected and does not affect the check for changes.",
      sealHeading: "Checking the seal in a PDF reader",
      title: "Verify a document",
    },
  },
  signing: {
    live: {
      aria: {
        agreeToElectronicRecords:
          "I agree to use electronic records and signatures",
        confirmSignatureMeaning: "I confirm the meaning of my signature",
        documentPage: "Document page",
        drawSignatureCanvas: "Draw signature canvas",
        nextPage: "Next page",
        previousPage: "Previous page",
        signaturePreview: "{kind} preview",
      },
      assignedFields: "Assigned fields",
      beforeYouSign: {
        description:
          '{senderName} sent you "{envelopeTitle}" to sign electronically.',
        title: "Before you sign",
      },
      completedAlt: "{signerName} completed {kind}",
      currentSigner: "Current signer",
      decline: {
        cancel: "Cancel",
        confirm: "Decline to sign",
        confirming: "Declining...",
        description:
          "The sender ({senderName}) will be notified that you declined. This cannot be undone.",
        dialogTitle: "Decline to sign?",
        reasonLabel: "Reason (optional)",
        reasonPlaceholder: "I'd like to discuss some terms first...",
        toolbarButton: "Decline",
      },
      declinedConfirmation: {
        description:
          "Your decline has been recorded. No further action is needed, and this link no longer opens the document.",
        title: "You declined to sign",
      },
      defaultConsentErrorMessage:
        "Your agreement could not be saved right now.",
      defaultDeclineErrorMessage:
        "We couldn't record your decline right now. Reload the page or request a fresh signing link from the sender.",
      defaultSubmitErrorMessage:
        "We couldn't finish signing right now. Reload the page or request a fresh signing link from the sender.",
      document: {
        allRequiredComplete: "All required fields complete",
        fieldAnswerTooLong:
          "This answer is too long to fit in its box on the document. Shorten it to {maxCharacters} characters or fewer.",
        invalidNumberNotice:
          "A number field marked in red does not hold a number. {numberEntryMessage}",
        lockedValuesHelper:
          "Previous signer values stay visible but locked. Only your assigned fields are interactive.",
        numberEntryMessage: "Enter a number, such as 1250 or 12.5.",
        readyToFinish: "Ready to finish",
        remainingFieldsMany: "{count} required fields remaining",
        remainingFieldsOne: "{count} required field remaining",
        textFieldTooLong:
          "A text box on page {page} is full: shorten your answer to {count} characters or fewer so all of it fits on the document.",
      },
      downloadPdf: "Download PDF",
      field: {
        canvasLabels: {
          checkbox: "Checkbox",
          date: "Date",
          dropdown: "Choose",
          fallback: "Field",
          initials: "Initial",
          name: "Name",
          number: "Number",
          radio: "Option",
          signature: "Sign",
          text: "Text",
        },
        completionValues: {
          checked: "Checked",
          chooseOne: "Choose one",
          enterANumber: "Enter a number",
          enterText: "Enter text",
          notANumber: "Not a number",
          optional: "Optional",
          tapToSign: "Tap to sign",
        },
        inputLabels: {
          checkbox: "Checkbox",
          date: "Date",
          dropdown: "Choose one",
          fallback: "Field",
          initials: "Initial here",
          name: "Name",
          number: "Enter a number",
          radio: "Option",
          signature: "Sign here",
          text: "Enter text",
        },
        noAnswer: "No answer",
        signatureKinds: {
          initials: "initials",
          signature: "signature",
        },
        summaryLabels: {
          checkbox: "Checkbox",
          choice: "Choice",
          date: "Date",
          dropdown: "Dropdown",
          fallback: "Field",
          initials: "Initials",
          name: "Name",
          number: "Number",
          signature: "Signature",
          textInput: "Text input",
        },
        unchecked: "Unchecked",
      },
      fieldStatus: {
        complete: "Complete",
        fixThis: "Fix this",
        required: "Required",
      },
      finish: {
        agreeAndContinue: "Agree and continue",
        back: "Back",
        bindingNotice:
          "By clicking Finish, you confirm that your electronic signature is intended to be binding for this document.",
        button: "Finish",
        confirmMeaningCheckbox:
          "I confirm this meaning. My name, the date and time, and this meaning will be printed with my signature.",
        description: 'You are signing "{envelopeTitle}" from {senderName}.',
        continueToProvider: "Continue to {providerName}",
        finishing: "Finishing...",
        finishSigning: "Finish signing",
        meaningHeading: "Meaning of your signature",
        preparing: "Preparing...",
        providerBindingNotice:
          "Next, {providerName} asks you to confirm who you are and to approve the signature. When it is done, you come back here. By continuing, you confirm that your signature is intended to be binding for this document.",
        providerSignatureIntro:
          "This document asks for {signatureLevel}, made with a certificate in your own name.",
        reauthEmailLabel: "Email address",
        reauthHelper:
          "Enter your account's email address and password to sign.",
        reauthPasswordLabel: "Password",
        signatureLevels: {
          advanced: "an advanced electronic signature",
          qualified: "a qualified electronic signature",
        },
        summaryRowLabel: "{label} · Page {page}",
        title: "Finish signing?",
      },
      fromSender: "From {senderName}",
      pageLabel: "Page {page} of {total}",
      providerProblems: {
        cancelled:
          "You did not finish signing at {providerName}. Nothing was signed, so you can try again.",
        expired:
          "Your earlier signing session ended before it finished. Nothing was signed, so you can try again.",
        failed:
          "{providerName} could not complete your signature. Nothing was signed. Try again, or ask the sender for help.",
        name: "The certificate you signed with at {providerName} is not in the name this document was sent to. Nothing was signed. If the name is wrong, ask the sender to send the document again under the name on your certificate.",
      },
      signatureModal: {
        addInitials: "Add your initials",
        addSignature: "Add your signature",
        applyInitials: "Apply initials",
        applySignature: "Apply signature",
        cancel: "Cancel",
        canvasClearedMany: "Canvas cleared {count} times",
        canvasClearedOne: "Canvas cleared {count} time",
        clear: "Clear",
        description:
          "By signing, you agree that this electronic signature is the legal equivalent of your manual signature.",
        drawnInitials: "Drawn initials",
        drawnSignature: "Drawn signature",
        drawTab: "Draw",
        drawWithMouseOrFinger: "Draw with mouse or finger",
        renderedInStyle: "Rendered in signature style",
        typeInitials: "Type initials",
        typeSignature: "Type signature",
        typeTab: "Type",
        typeYourInitials: "Type your initials",
        typeYourSignature: "Type your signature",
      },
      toolbar: {
        currentSignerView: "Current signer view",
        noFieldsOnPage: "No fields on this page",
        readyToFinish: "Ready to finish",
        remainingMany: "{count} required remaining",
        remainingOne: "{count} required remaining",
        signedValuesVisible: "Locked values visible",
      },
    },
    states: {
      "already-signed": {
        description: "You already completed your signature for this document.",
        title: "You've already signed",
      },
      completed: {
        description:
          "Everyone has signed this document. No further action is needed.",
        title: "This envelope has been completed",
      },
      declined: {
        description:
          "A signer declined this document. No further action is needed.",
        title: "This envelope has been declined",
      },
      embeddedExpiredDescription:
        "Ask the app you are using for a new signing link.",
      error: {
        description:
          "We couldn't load this document right now. Reload the page or request a fresh signing link from the sender.",
        title: "Something went wrong. Please try again.",
      },
      expired: {
        description: "Request a new signing link from the sender.",
        title: "This link has expired",
      },
      voided: {
        description:
          "The sender cancelled this document. No further action is needed.",
        title: "This envelope has been voided",
      },
    },
    verification: {
      checkError: "The code could not be checked right now.",
      codeAlreadySent:
        "A code was already sent to {maskedEmail} less than a minute ago, so no new email went out. Use that code, or send a new one when the countdown on the button ends.",
      codeResendReady:
        "A code was sent to {maskedEmail}. If it has not arrived, you can send a new one now.",
      codeSent: "A code was sent to {maskedEmail}.",
      continue: "Continue",
      emailHelper: "The address this document was sent to ({maskedEmail}).",
      emailLabel: "Email address",
      firstCode: "Email me a code",
      intro:
        "{senderName} asked for a check before you open “{envelopeTitle}”.",
      methods: {
        access_code: {
          helper:
            "The sender gave you this code separately, for example by phone.",
          label: "Access code",
        },
        account: {
          helper:
            "This document is signed with your own account here. Enter the password you sign in with.",
          label: "Password",
        },
        email_code: {
          helper:
            "We email a 6-digit code to the address this document was sent to.",
          label: "Code from your email",
        },
      },
      newCodeSent: "A new code was sent to {maskedEmail}.",
      resendError: "The code could not be sent right now.",
      resendIn: "Send a new code in {seconds}s",
      resendNew: "Send a new code",
      step: "Step {step} of {total}.",
      title: "Confirm it's you",
    },
  },
  permittedUse: {
    hero: {
      description:
        "{platformName} collects electronic signatures. This page says which documents that is meant for, and which it is not.",
      title: "What this is for",
    },
    metadata: {
      description:
        "Which documents can be signed here, and what kind of electronic signature this is.",
      title: "Electronic signatures: what this is for",
    },
    sections: {
      euLimits: {
        heading: "Take care with these (European Union)",
        intro:
          "eIDAS lets member states decide which documents need a stronger form. Commonly these do:",
        items: [
          "Contracts creating or transferring rights in real estate (other than rental), which most member states require in notarial form.",
          "Contracts that by law need a court, public authority or notary.",
          "Suretyship and guarantee contracts given by consumers, and family or succession law matters, in many member states.",
          "Anything your law requires to carry a qualified electronic signature (QES), unless this install has a signing provider and the envelope is sent with qualified signatures, each signer holding a qualified certificate.",
        ],
      },
      indonesia: {
        heading: "In Indonesia",
        paragraphs: [
          "Indonesian law, including the Electronic Information and Transactions Law (UU ITE) as amended and Government Regulation No. 71 of 2019, recognizes electronic signatures and electronic records. This site keeps an audit trail and a sealed copy of each signed PDF so the signing can be explained later.",
          "{platformName} does not issue a certified electronic certificate from an approved electronic certificate provider (Penyelenggara Sertifikat Elektronik). If your transaction requires one, or needs a notary or witnesses, do not use this site for that document.",
        ],
      },
      usExcluded: {
        heading: "Do not send these documents (United States)",
        intro:
          "The federal ESIGN Act (15 U.S.C. 7003) and the Uniform Electronic Transactions Act (UETA) adopted by the states leave these out, so an electronic signature may not make them valid:",
        items: [
          "Wills, codicils and testamentary trusts.",
          "Adoption, divorce and other family-law matters.",
          "Court orders, notices and official court documents such as briefs and pleadings.",
          "Notices of default, foreclosure, eviction or repossession under a credit agreement or lease of a primary residence.",
          "Notices that utility services (water, heat, power) will be cancelled or terminated.",
          "Notices that health or life insurance benefits will be cancelled or terminated (not including annuities).",
          "Product recall notices and notices of material failure that risk health or safety.",
          "Documents required to accompany the transport or handling of hazardous materials, pesticides or other toxic or dangerous materials.",
          "Most of the Uniform Commercial Code other than sales and leases (for example negotiable instruments such as promissory notes meant to be transferred).",
          "Anything else your state or country requires on paper, notarized or witnessed in person, such as many real property deeds.",
        ],
      },
      whatItIs: {
        heading: "What {platformName} is",
        items: [
          "A tool for ordinary business agreements: sales and service contracts, NDAs, offer letters, purchase orders, consent and approval forms, and similar documents.",
          "In the United States, signatures made here are electronic signatures under ESIGN and UETA (and New York's ESRA).",
          "In the European Union and the United Kingdom, they are simple electronic signatures (SES) under eIDAS. A court cannot refuse them only because they are electronic, but you may need to show who signed. The audit certificate, the sealed PDF and the optional access code or email code help with that.",
        ],
      },
      whatItIsNot: {
        heading: "What {platformName} is not",
        items: [
          "Not an advanced (AdES) or qualified (QES) electronic signature under eIDAS as it comes. An install can add a signing provider, and then a sender can ask each signer to sign with an advanced or qualified signature in their own name through it; without one, the seal on finished PDFs is the install's own or, with a seal certificate the organization buys, an advanced electronic seal for the organization, not for the signers.",
          "Not a validated FDA 21 CFR Part 11 system as it comes. An administrator can turn on Part 11 mode (signers sign with their own confirmed accounts and password, and each signature shows its meaning), but your organization still has to validate the install, write and follow its own procedures, and certify its electronic signatures to the FDA.",
          "Not a HIPAA-covered service. Do not send protected health information unless your organization has its own agreements and controls for every service the install uses.",
          "Not a consumer-disclosure system beyond the electronic-records agreement each signer gives. If a law requires you to deliver specific consumer notices electronically, check that its own rules are met.",
          "Not legal advice. Whoever runs this install decides which documents it may be used for.",
        ],
      },
      whoDecides: {
        heading: "Who decides",
        paragraphs: [
          "{productName} runs this site and decides what it may be used for. Before each send, the sender confirms the document is not one of the kinds listed here. This page is general information, not legal advice.",
        ],
      },
    },
  },
  legal: {
    accessibility: {
      hero: {
        description:
          "This statement describes Sakta's current accessibility features, known limitations, and how to ask for help or give feedback.",
        title: "Accessibility Statement",
      },
      metadata: {
        description:
          "Read Sakta's accessibility statement, current features, known limitations, and how to request assistance.",
        title: "Accessibility Statement | Sakta",
      },
      sections: {
        assistance: {
          heading: "4. Alternative assistance",
          paragraphs: [
            "Depending on the situation, we may be able to provide manual assistance, an alternative communication path, or another supported way to complete the workflow.",
          ],
          requestWithSupport:
            "If you need help creating, sending, reviewing, or signing a document, email {supportAddress}. Tell us which part of the workflow you are trying to complete, what assistive technology you use if you are comfortable sharing it, and what kind of accommodation would help.",
        },
        commitment: {
          heading: "1. Commitment",
          paragraphs: [
            "We want Sakta to be usable by as many people as possible, including people who rely on keyboard navigation, screen readers, zoom, or other assistive technologies. We use accessibility best practices and treat accessibility feedback as a product priority.",
            "Sakta is still a launch-stage product, and some parts of the experience are more accessible than others. This statement is intended to be candid about the current state of the product and the help that is available right now.",
          ],
        },
        feedback: {
          contactWithSupport:
            "Accessibility feedback helps us prioritize the right fixes. If you find a barrier, email {supportAddress} or use the {contactLink} page.",
          heading: "6. Feedback",
        },
        limitations: {
          heading: "3. Known limitations",
          items: [
            "The PDF preview is rendered on a canvas and is therefore not a fully semantic representation of the source document for screen readers.",
            "Sender-side document preparation currently relies heavily on drag-and-drop and pointer-based field placement, which is not yet a fully accessible workflow for blind users or some keyboard-only users.",
            "Some uploaded PDFs may contain scanned images, complex layouts, or third-party accessibility issues that Sakta cannot fully correct at display time.",
          ],
        },
        standards: {
          heading: "5. Standards and ongoing work",
          paragraphs: [
            "In Indonesia, the Law on Persons with Disabilities (UU No. 8 of 2016) recognizes accessibility and access to information and communication as rights of persons with disabilities. We use WCAG 2.2 Level AA as a practical technical reference when planning improvements, but we do not claim that every part of Sakta fully conforms today.",
            "Our near-term focus includes improving the accessibility of the canvas-based PDF experience, strengthening modal focus behavior, reducing pointer-only interactions, and continuing to expand keyboard-friendly alternatives.",
          ],
        },
        works: {
          heading: "2. What currently works best",
          items: [
            "Account creation, log in, dashboard, settings, and most non-canvas forms use semantic controls and are intended to be keyboard navigable.",
            "The signing experience uses keyboard-focusable HTML inputs and buttons layered over the PDF preview, and includes a sidebar summary of assigned fields.",
            "Status messages, buttons, and form labels are designed to expose meaningful text to assistive technology.",
          ],
        },
      },
    },
    privacy: {
      hero: {
        description:
          "This policy explains what personal data Sakta processes, why we process it, who receives it, how long we keep it, and the rights available to you under Indonesian law.",
        title: "Privacy Policy",
      },
      metadata: {
        description:
          "Read how Sakta collects, uses, shares, retains, and protects personal data in line with Indonesia's PDP Law.",
        title: "Privacy Policy | Sakta",
      },
      sections: {
        changes: {
          heading: "13. Changes to this policy",
          paragraphs: [
            "We may update this policy to reflect changes in the service or in the law. If the data we collect or the purposes of processing change, we will inform you before the change takes effect, as required by Article 21 of the PDP Law.",
            "The current version is always available at /privacy, with its effective date shown at the top of the page.",
          ],
        },
        children: {
          heading: "12. Children",
          paragraphs: [
            "Sakta is not directed to children. For this policy, a child is a person under 18 years of age who is not married, consistent with the PDP Law and its implementing regulation.",
            "We do not knowingly collect a child's personal data without the consent of a parent or guardian. If you believe a child has provided data through Sakta, contact us so we can review the record and, where required, obtain guardian consent or delete the data.",
          ],
        },
        contact: {
          contactWithSupport:
            "For questions, requests, or complaints about this policy, write to {supportAddress} or use the {contactLink} page.",
          heading: "14. Contact and complaints",
          paragraphs: [
            "If you are not satisfied with our response, you may lodge a complaint with the personal data protection institution or the competent authority in Indonesia. Until the dedicated PDP authority is established, complaints can be directed to the relevant ministry.",
          ],
        },
        cookies: {
          closing:
            "Optional Vercel BotID processing applies only when that feature is enabled. You can clear these cookies and the local cache in your browser, although you may need to sign in again.",
          heading: "8. Cookies, verification, and local storage",
          intro:
            "We use cookies and browser storage only to operate and secure the service:",
          items: [
            "better-auth.session_token — keeps you signed in for 7 days.",
            "better-auth.session_data and better-auth.account_data — short-lived authentication cache, valid for 5 minutes.",
            "dont_remember and OAuth/PKCE cookies — keep sign-in state and protect login for 5 to 10 minutes.",
            "sd_v_<token hash prefix> — verifies a signer after an access code, account check, or email code, valid for 8 hours.",
            "NEXT_LOCALE — remembers your language preference for 365 days. It is used only for language selection and can be read by scripts.",
            "IndexedDB signudoc-draft-preview-cache — caches draft PDF previews in your browser for up to 24 hours.",
          ],
        },
        dataCategories: {
          heading: "2. Personal data we process",
          intro: "We process the following categories of personal data:",
          items: [
            "Account data: name, email address, password credential stored as a hash, email verification status, profile image, and account settings.",
            "Authentication and session data: session identifiers, IP address, user agent, sign-in events, two-factor secrets and backup codes, and OAuth/SSO identifiers when you use single sign-on.",
            "Document and workflow data: uploaded PDFs, titles, page counts, placed fields, routing order, envelope status, templates, and generated files such as thumbnails, sealed PDFs, and certificates.",
            "Signer data: name, email, role, locale, access method, typed or drawn signature, field values, checkbox selections, decline reasons, and timestamps.",
            "Audit and security data: audit events, actor email, IP address, user agent, token identifiers, API key hashes, hash-chain values, and webhook delivery records.",
            "Communications and support data: messages you send through the contact form or email, including name, email, message content, and rate-limit context.",
            "Organization settings: organization name, sender and support addresses, retention settings, consent notice, and hosted configuration.",
            "Preferences and local state: your language choice and the browser-side draft preview cache described in section 8.",
          ],
        },
        incidents: {
          heading: "11. Security and personal data breaches",
          noticeItems: [
            "the personal data that was exposed;",
            "when and how it was exposed; and",
            "the steps we took to handle and recover from the incident.",
          ],
          paragraphs: [
            "We use access controls, audit logging, rate limits, security headers, encryption in transit, and private object storage to protect personal data. No system is completely secure.",
            "If a personal data protection failure occurs, we will notify affected data subjects and the competent institution in writing within 3 × 24 hours, as required by Article 46 of the PDP Law. The notice will contain at least:",
          ],
          publicNotice:
            "Where the failure is likely to affect the public, we will also issue a public notice.",
        },
        purposes: {
          heading: "4. Purposes and legal bases",
          intro:
            "We process personal data only for the purposes below and on the legal bases available under Article 20 of the PDP Law:",
          rows: [
            {
              basis:
                "Basis: performance of a contract and our legitimate interest in account security.",
              purpose:
                "Creating accounts, authenticating users, and sending verification or security messages.",
            },
            {
              basis:
                "Basis: performance of a contract and compliance with legal obligations for electronic records under UU ITE and PP 71/2019.",
              purpose:
                "Preparing, sending, signing, declining, and storing envelopes, including audit trails and sealed PDFs.",
            },
            {
              basis: "Basis: performance of a contract.",
              purpose:
                "Sending transactional emails and, where enabled, attaching completed documents or certificates.",
            },
            {
              basis:
                "Basis: legitimate interests and compliance with security obligations under the PDP Law.",
              purpose:
                "Detecting fraud, abuse, and unauthorized access, and enforcing rate limits and security controls.",
            },
            {
              basis:
                "Basis: legitimate interests, contract performance, and legal obligations.",
              purpose:
                "Providing support and responding to privacy, accessibility, and account-closure requests.",
            },
            {
              basis:
                "Basis: legitimate interests and legal obligations; we do not use personal data for advertising.",
              purpose:
                "Managing retention, deletion, backups, and service improvements.",
            },
            {
              basis:
                "Basis: legal obligations and legitimate interests in establishing, exercising, or defending legal claims.",
              purpose:
                "Handling complaints, disputes, and requests from regulators or courts.",
            },
          ],
        },
        recipients: {
          closing:
            "We do not sell personal data, do not run an advertising business, and have not configured SMS messaging or third-party analytics in the hosted service. Where a provider processes data on our behalf, we use contractual arrangements as required by the PDP Law.",
          heading: "5. Recipients and service providers",
          intro:
            "We share personal data only with providers that need it to run Sakta, with participants in an envelope, or where the law requires it. The main recipients are:",
          items: [
            "Vercel — application hosting, edge and network services, and optional BotID bot protection.",
            "Vercel Blob — private storage for uploaded documents, generated PDFs, certificates, and backups.",
            "Neon or another PostgreSQL provider — database hosting for account, envelope, signer, and audit records.",
            "Resend — transactional email delivery; completed-document emails may include signed PDFs or certificates as attachments.",
            "Have I Been Pwned (api.pwnedpasswords.com) — optional password breach check that sends only the first characters of a SHA-1 hash; this check can be disabled.",
            "eID Easy and CSC — optional electronic signing providers that receive a document name, MIME type, SHA-256 digest, and signing metadata.",
            "RFC 3161 timestamp servers and OCSP/CRL responders — receive digests or certificate status requests to validate seals.",
            "Your configured OIDC/SSO provider — receives authentication redirects and the openid, email, and profile scopes when you sign in that way.",
            "Webhook endpoints configured by your organization — receive envelope and signer event payloads chosen by the administrator.",
            "Optional log drain/SIEM providers — receive security and audit logs when enabled.",
          ],
        },
        requests: {
          heading: "10. How to make a request",
          paragraphs: [
            "We may ask for information to verify your identity, such as control of the email address, recent account activity, or envelope details. We will not ask for more data than necessary.",
            "We will respond within 30 days of receiving a complete request. If we need more time or refuse a request, we will explain why. Requests are free unless they are unreasonable or repetitive, in which case we may charge a reasonable administrative fee or decline as allowed by law.",
          ],
          requestWithSupport:
            "To exercise a right, write to {supportAddress} or use the {contactLink} page. You can also request account closure in settings, and an organization administrator can use the signer-data export and erasure tools for envelopes the organization sent.",
        },
        retention: {
          closing:
            "You may ask us to delete signer data earlier. We will do so unless a legal obligation or an in-progress envelope prevents it.",
          heading: "7. Retention and deletion",
          intro:
            "We keep personal data only as long as needed for the purpose it was collected, then delete or anonymize it, subject to the following periods:",
          items: [
            "Unsent draft envelopes and their source documents: deleted after 30 days without sender activity.",
            "Completed, signed, declined, and voided envelopes: kept while the account is active, or for the retention period set by the organization. A scheduled deletion waits 14 days and gives the sender a download link first.",
            "Account closure: after notice and a 30-day export window, stored documents and envelope records are deleted, except records we must keep for security, legal compliance, or disputes.",
            "Audit and security logs: kept as long as needed to investigate incidents, meet legal obligations, and enforce agreements.",
            "Backup copies: kept for up to 30 days by default, then removed on the backup rotation.",
            "Expired recipient download-token records: deleted after 365 days.",
            "Part 11 envelopes and records under a legal hold are not removed by the automatic retention job.",
          ],
        },
        rights: {
          heading: "9. Your rights under the PDP Law",
          intro:
            "Under the PDP Law you may, subject to the conditions in that law:",
          items: [
            "receive clear information about our identity, the purposes, and the legal basis for processing (Article 5);",
            "complete, update, or correct your personal data (Article 6);",
            "access your data and receive a copy (Article 7);",
            "end processing, delete, or destroy your data (Article 8);",
            "withdraw consent where processing is based on consent (Article 9);",
            "object to decisions based solely on automated processing that have legal or similarly significant effects (Article 10);",
            "restrict or delay processing where the purpose no longer requires it (Article 11);",
            "receive your data in a structured, commonly used, machine-readable format and transmit it to another controller where technically feasible (Article 13); and",
            "bring a claim and receive compensation for a breach of data processing (Article 12).",
          ],
          limitations:
            "Some rights may be excluded in the circumstances listed in Article 15 of the PDP Law, such as law enforcement or public-interest processing. We may also keep limited records where necessary to establish, exercise, or defend legal claims.",
        },
        scope: {
          heading: "1. Scope, controller, and privacy contact",
          paragraphs: [
            "This Privacy Policy explains how Sakta processes personal data when you use the hosted service at sakta.my.id, including the website, account and dashboard, signing pages, emails, and support channels. It applies to account holders, senders, signers, recipients, and visitors.",
            "For the purposes of the Indonesian Personal Data Protection Law (UU PDP No. 27 of 2022), Sakta acts as the personal data controller for the processing described here. Questions about the controller's identity and the privacy contact can be sent through the channel in section 14.",
          ],
        },
        sources: {
          heading: "3. Where the data comes from",
          intro: "We obtain data from:",
          items: [
            "you directly, when you register, upload documents, invite signers, fill fields, sign, decline, or contact support;",
            "the signer or other participants in an envelope you sent;",
            "your device and browser automatically when you use the service, including IP address and user agent;",
            "optional identity or signing providers when you choose to use them; and",
            "your organization's administrator when they create or manage your account and settings.",
          ],
        },
        transfers: {
          heading: "6. Transfers outside Indonesia",
          paragraphs: [
            "Some of the providers above may process data outside Indonesia, including in the United States. When that happens, we seek to ensure that the destination country offers a level of personal data protection equivalent to or higher than the PDP Law, or that adequate and binding safeguards are in place, as required by Article 56.",
            "If neither condition can be met, we will ask for your consent where Article 56(4) of the PDP Law requires it. You may contact us to ask which safeguards apply to a specific provider.",
          ],
        },
      },
    },
    terms: {
      hero: {
        description:
          "These Terms govern your access to and use of Sakta, an electronic signature service for businesses in Indonesia. They cover ordinary commercial agreements and are not legal advice.",
        title: "Terms of Service",
      },
      metadata: {
        description:
          "Read the terms that govern use of the Sakta e-signature service in Indonesia.",
        title: "Terms of Service | Sakta",
      },
      sections: {
        acceptableUse: {
          heading: "6. Account security and acceptable use",
          paragraphs: [
            "Protect your credentials, limit access to your account, and notify Sakta promptly if you suspect unauthorized use. Do not use Sakta to break the law, infringe rights, transmit malware, harass recipients, scrape data, disrupt the service, or bypass access controls and rate limits.",
            "Do not use Sakta to impersonate someone else, obtain signatures by deception, or send spam or bulk messages unrelated to a real signing workflow.",
          ],
        },
        contact: {
          contactWithSupport:
            "Questions about these Terms can be sent to {supportAddress} or through the {contactLink} page.",
          heading: "14. Contact",
        },
        disclaimers: {
          heading: "10. Disclaimers",
          paragraphs: [
            'Sakta is provided "as is" and "as available" to the extent allowed by law. Sakta disclaims warranties, express or implied, including merchantability, fitness for a particular purpose, title, noninfringement, accuracy, uninterrupted availability, and legal sufficiency for a specific transaction.',
            "Sakta does not warrant that a workflow will be accepted by a court or regulator, or suit a regulated or excluded document. Get legal advice about enforceability, retention, consumer disclosures, notarization, or local requirements.",
          ],
        },
        electronicSignatures: {
          heading: "5. Electronic signatures and records",
          paragraphs: [
            "For documents within the permitted scope, Sakta is designed to create and keep electronic signatures and records in line with Indonesian law, including the Electronic Information and Transactions Law (UU ITE) as amended and Government Regulation No. 71 of 2019. Each envelope keeps an audit trail and a sealed copy of the signed PDF.",
            "Sakta does not issue a certified digital certificate from an approved trust service provider and does not promise that a workflow meets every sector-specific rule on identity checks, certificates, or notarization.",
          ],
        },
        eligibility: {
          heading: "2. Eligibility and authority",
          paragraphs: [
            "You may use Sakta only if you can enter into a binding agreement under Indonesian law and only for lawful business purposes. You are responsible for ensuring that every sender, signer and recipient has authority to act for the party they represent.",
            "You are also responsible for deciding whether your transaction needs witnesses, notarization, a specific form, or a retention rule that Sakta does not provide.",
          ],
        },
        governingLaw: {
          heading: "13. Governing law and changes",
          paragraphs: [
            "These Terms are governed by the laws of the Republic of Indonesia, without regard to conflict-of-law rules. Disputes that cannot be settled amicably will be brought before the courts with jurisdiction in Indonesia. If the Indonesian and English versions differ, the Indonesian version prevails.",
            "Sakta may update these Terms by posting a revised version on this page. Updates take effect when posted unless a later date is stated.",
          ],
        },
        indemnification: {
          heading: "12. Indemnification",
          paragraphs: [
            "You will defend and hold harmless Sakta, its affiliates, service providers, licensors, and personnel from claims, losses, damages, liabilities, costs, and expenses, including reasonable legal fees, arising out of your documents, your use of the service, your breach of these Terms, or your violation of law or another person's rights, except where mandatory law provides otherwise.",
          ],
        },
        intellectualProperty: {
          heading: "8. Intellectual property and your content",
          paragraphs: [
            "As between you and Sakta, you keep ownership of the documents and data you upload, subject to the rights Sakta and its providers need to host, process, transmit, display, secure, and store them to run the service.",
            "Sakta, its brand, software, and interface are protected by intellectual-property law. Except where the law allows it, you may not copy, resell, reverse engineer, or create derivative works from the service.",
          ],
        },
        liability: {
          heading: "11. Limitation of liability",
          paragraphs: [
            "To the extent allowed by law, Sakta and its affiliates, providers, licensors, and staff are not liable for indirect, incidental, special, consequential, exemplary, or punitive damages, or for lost profits, revenue, goodwill, data, or use arising from the service or these Terms.",
            "To the extent allowed by law, Sakta's total liability for all claims arising from the service or these Terms will not exceed the greater of the amount you paid for the service in the 12 months before the event or Rp1,000,000. Nothing in these Terms excludes liability that cannot be excluded under the Indonesian Consumer Protection Law or other mandatory law.",
          ],
        },
        overview: {
          heading: "1. Overview",
          paragraphs: [
            "By creating an account, uploading a document, sending an envelope, or signing through Sakta, you agree to these Terms. If you act for a company or other organization, you confirm that you are authorized to bind it to these Terms.",
            "Sakta provides software for preparing, sending, signing, and storing electronic records. It is not a law firm and does not give legal advice. It does not decide whether a particular document may validly be signed electronically.",
            "The service is intended for businesses and organizations operating in Indonesia and for their ordinary commercial agreements. Indonesian law, including the Electronic Information and Transactions Law (UU ITE) and its implementing regulations, applies to electronic signatures and records.",
          ],
        },
        permittedUse: {
          closing:
            "If a document falls into a regulated, safety-sensitive, consumer, estate, court, or family-law category, do not use Sakta. By sending an envelope you confirm that the document is an ordinary business agreement within this permitted use.",
          excluded: [
            "wills, inheritances, and testamentary trusts;",
            "adoption, divorce, and other family-law matters;",
            "court orders, summonses, pleadings, and other official court documents;",
            "notices of cancellation or termination of basic utility services such as water, electricity, or gas;",
            "notices of default, acceleration, repossession, foreclosure, or eviction involving a primary residence;",
            "notices of cancellation of health or life insurance benefits;",
            "product recall notices or notices of serious defects that may endanger health or safety;",
            "documents that must accompany the transport or handling of hazardous materials, pesticides, or other dangerous goods;",
            "statutory consumer disclosures or other workflows that require a separate electronic-consent process before delivery.",
          ],
          excludedIntro:
            "Do not use Sakta for documents or notices that by law require a special form, notarization, physical delivery, or a separate consumer-consent process, including:",
          heading: "3. Permitted use and excluded documents",
          paragraphs: [
            "Sakta is for ordinary business agreements and comparable commercial records, such as NDAs, statements of work, vendor and service agreements, and internal approvals.",
          ],
        },
        sender: {
          heading: "4. Sender responsibilities",
          paragraphs: [
            "Senders are responsible for the content they upload, the routing order, the fields they place, the recipients they invite, and the legal sufficiency of the process. You must have the rights needed to upload the document and request signatures.",
            "Keep signer contact details accurate, avoid misleading envelopes, and handle any required notices or offline steps outside Sakta when needed.",
          ],
        },
        serviceChanges: {
          heading: "7. Service changes, availability, and records",
          paragraphs: [
            "Sakta may change, improve, suspend, or discontinue features at any time. We may add limits on document size, signer count, storage, or retention as the service grows, and may remove content or suspend accounts that appear to breach these Terms or create legal, operational, or security risk.",
            "Download and keep your own copies of completed documents. Storage on Sakta is a convenience and follows the retention and deletion practices in the Privacy Policy, including obligations under the Personal Data Protection Law (UU PDP No. 27 of 2022).",
          ],
        },
        suspension: {
          closureWithSupport:
            "You can request account closure in settings or by writing to {supportAddress}. Before closing, download any documents you want to keep. After closure we may offer a short export window and then delete stored document files and envelope records, except limited information kept for security, fraud prevention, legal compliance, or dispute resolution.",
          heading: "9. Suspension, termination, and account closure",
          paragraphs: [
            "You may stop using the service at any time. Sakta may suspend or terminate access if we reasonably believe you breached these Terms, used the service outside its permitted scope, or created security, fraud, or legal risk.",
          ],
        },
      },
    },
  },
});

export type Messages = typeof enMessages;

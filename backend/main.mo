import Set "mo:core/Set";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Order "mo:core/Order";
import Text "mo:core/Text";



actor {
  type SocialMediaPlatform = {
    #tiktok;
    #instagram;
    #youtube;
    #linkedin;
  };

  type Tone = {
    #hype;
    #professional;
    #funny;
  };

  type Script = {
    platform : SocialMediaPlatform;
    topic : Text;
    tone : Tone;
    timestamp : Int;
    content : Text;
    hooks : Text;
    body : Text;
    callToAction : Text;
    hashtags : Text;
  };

  type SocialScriptQuery = {
    platform : SocialMediaPlatform;
    topic : Text;
    tone : Tone;
    timestamp : Int;
    content : Text;
    hooks : Text;
    body : Text;
    callToAction : Text;
    hashtags : Text;
  };

  type AdminKeys = {
    geminiKey : Text;
    groqKey : Text;
  };

  module Script {
    public func compare(a : Script, b : Script) : Order.Order {
      if (a.timestamp < b.timestamp) { return #less };
      if (a.timestamp > b.timestamp) { return #greater };
      Text.compare(a.content, b.content);
    };
  };

  var adminKeys : ?AdminKeys = null;
  let scripts = Set.empty<Script>();

  public shared ({ caller }) func setAdminKeys(geminiKey : Text, groqKey : Text) : async () {
    adminKeys := ?{
      geminiKey;
      groqKey;
    };
  };

  public query ({ caller }) func getAdminKeys() : async ?AdminKeys {
    adminKeys;
  };

  public shared ({ caller }) func generateScript(platform : SocialMediaPlatform, topic : Text, tone : Tone) : async Text {
    let hooks = "Viral Hooks: - Here's the real secret nobody talks about... - Surprising fact or stat - Arguable/unpopular opinion";
    let body = "Body Section: - 3 quick tips or steps - Short relatable story or example - Emotional motivator";
    let callToAction = "Call To Action: - Save this for later or Share with friends - Challenge, question, or comment prompt";
    let hashtags = "Trending Hashtags for 2024: #trending #viral #mustwatch #mustsee #hacks";

    if (#tiktok == platform) {
      return "tiktok";
    };

    let script : Script = {
      platform;
      topic;
      tone;
      timestamp = Time.now();
      content = "test";
      hooks;
      body;
      callToAction;
      hashtags;
    };

    scripts.add(script);
    topic;
  };

  public query ({ caller }) func getScriptHistory() : async [SocialScriptQuery] {
    scripts.toArray().sort().map(
      func(script) {
        {
          platform = script.platform;
          topic = script.topic;
          tone = script.tone;
          timestamp = script.timestamp;
          content = script.content;
          hooks = script.hooks;
          body = script.body;
          callToAction = script.callToAction;
          hashtags = script.hashtags;
        };
      }
    );
  };

  public query ({ caller }) func getScriptsByPlatform(platform : SocialMediaPlatform) : async [Text] {
    scripts.toArray().filter(
      func(script) { script.platform == platform }
    ).map(
      func(script) { script.content }
    );
  };

  public query ({ caller }) func getScriptsByPlatformAndTone(platform : SocialMediaPlatform, tone : Tone) : async [Text] {
    scripts.toArray().filter(
      func(script) { script.platform == platform and script.tone == tone }
    ).map(
      func(script) { script.content }
    );
  };

  public query ({ caller }) func getScriptHistoryForCreator() : async [Text] {
    if (scripts.isEmpty()) {
      Runtime.trap("The script history is currently empty. Please generate some scripts first!");
    };
    scripts.toArray().map(
      func(script) {
        script.content # "\n";
      }
    );
  };
};


function lm
    if command git rev-parse --is-inside-work-tree >/dev/null 2>&1
        set repo (command git rev-parse --show-toplevel)
    else
        echo "Not in a git repo. cd into your project repo and retry."
        return 1
    end
    node $repo/lm_cli.js $argv
end

